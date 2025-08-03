provider "aws" {
  region = var.aws_region
}


# -----------------------------------------------------------------------------
# VPC
# -----------------------------------------------------------------------------
//  enabled DNS hostnames for your VPC.
// Main vpc
resource "aws_vpc" "main_VPC" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  
  tags = {
      Name = "ALO_vpc"
  }
}

// SubNetwork 
resource "aws_subnet" "public_subnets" {
 count             = length(var.public_subnet_cidrs)
 vpc_id            = aws_vpc.main_VPC.id
 cidr_block        = element(var.public_subnet_cidrs, count.index)
 availability_zone = element(var.azs, count.index)
 
 tags = {
   Name = "Public Subnet ${count.index + 1}"
 }
}
resource "aws_subnet" "private_subnets" {
 count             = length(var.private_subnet_cidrs)
 vpc_id            = aws_vpc.main_VPC.id
 cidr_block        = element(var.private_subnet_cidrs, count.index)
 availability_zone = element(var.azs, count.index)
 
 tags = {
   Name = "Private Subnet ${count.index + 1}"
 }
}

// Gateway ( for external access )
resource "aws_internet_gateway" "gw" {
 vpc_id = aws_vpc.main_VPC.id
 
 tags = {
   Name = "Project VPC IG"
 }
}

// Second resource table ( connected to the gateway )
resource "aws_route_table" "second_rt" {
 vpc_id = aws_vpc.main_VPC.id
 
 route {
   cidr_block = "0.0.0.0/0"
   gateway_id = aws_internet_gateway.gw.id
 }
 
 tags = {
   Name = "2nd Route Table"
 }
}
resource "aws_route_table_association" "public_subnet_asso" {
 count = length(var.public_subnet_cidrs)
 subnet_id      = element(aws_subnet.public_subnets[*].id, count.index)
 route_table_id = aws_route_table.second_rt.id
}




# -----------------------------------------------------------------------------
# Lambda
# -----------------------------------------------------------------------------
// ZIP 4 Lambda
data "archive_file" "wd" {
  type = "zip"

  # source_dir = "./../wd"
  source_file = "./../wd/main.mjs"

  output_path = "./zip/wd.zip"
}


# 1. Crea il ruolo IAM per la Lambda Function
# Questo ruolo permetterà alla Lambda di eseguire le azioni necessarie (es. scrivere log in CloudWatch)
resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda_word_definition_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
      },
    ],
  })
}

# 2. Allega la policy di CloudWatch Logs al ruolo IAM
# Questo permette alla Lambda di scrivere i log delle sue esecuzioni in CloudWatch
resource "aws_iam_role_policy_attachment" "lambda_exec_policy" {
  role                          = aws_iam_role.lambda_exec_role.name
  policy_arn                    = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


# 4. Crea la Lambda Function
resource "aws_lambda_function" "word_definition_lambda" {
  function_name                 = var.lambda_function_name
  handler                       = "main.handler"
  runtime                       = "nodejs20.x"
  role                          = aws_iam_role.lambda_exec_role.arn
  filename                      = data.archive_file.wd.output_path
  source_code_hash              = data.archive_file.wd.output_base64sha256

  timeout                       = var.lambda_timeout
  memory_size                   = var.lambda_memory_size
}




# -----------------------------------------------------------------------------
# API GATEWAY
# -----------------------------------------------------------------------------
# --- API Gateway REST API ---
resource "aws_api_gateway_rest_api" "wd_api" {
  name        = "wd-api-gateway"
  description = "API Gateway for WD Lambda function"
}

# --- Risorsa /wd ---
resource "aws_api_gateway_resource" "wd_resource" {
  rest_api_id = aws_api_gateway_rest_api.wd_api.id
  parent_id   = aws_api_gateway_rest_api.wd_api.root_resource_id
  path_part   = "wd"
}

# --- Metodo POST su /wd ---
resource "aws_api_gateway_method" "wd_post_method" {
  rest_api_id   = aws_api_gateway_rest_api.wd_api.id
  resource_id   = aws_api_gateway_resource.wd_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

# --- Integrazione Lambda Proxy ---
resource "aws_api_gateway_integration" "wd_lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.wd_api.id
  resource_id             = aws_api_gateway_resource.wd_resource.id
  http_method             = aws_api_gateway_method.wd_post_method.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${aws_lambda_function.word_definition_lambda.arn}/invocations"
}

# --- Permesso per API Gateway di invocare la Lambda ---
resource "aws_lambda_permission" "allow_apigateway_to_invoke_wd_lambda" {
  statement_id  = "AllowAPIGatewayInvokeLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.word_definition_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.wd_api.execution_arn}/*/*"
}

# --- Deployment e Stage ---
resource "aws_api_gateway_deployment" "wd_deployment" {
  rest_api_id = aws_api_gateway_rest_api.wd_api.id
  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.wd_resource.id,
      aws_api_gateway_method.wd_post_method.id,
      aws_api_gateway_integration.wd_lambda_integration.id,
    ]))
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "wd_stage" {
  deployment_id = aws_api_gateway_deployment.wd_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.wd_api.id
  stage_name    = "dev"
}




# -----------------------------------------------------------------------------
# RDS
# -----------------------------------------------------------------------------
resource "aws_security_group" "rds_sg" {
  name        = "rds-security-group"
  description = "Allow inbound traffic to RDS"
  vpc_id      = aws_vpc.main_VPC.id

  # --- Regola per accesso da MySQL Dashboard (locale) ---
  ingress {
    description = "Allow MySQL/PostgreSQL from my local IP"
    from_port   = var.db_port
    to_port     = var.db_port
    protocol    = "tcp"
    cidr_blocks = [var.my_ip]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"] # Permetti tutto il traffico in uscita
  }





  // TODO: To delete
  ingress {
    description = "ALLOW ALL for testing"
    from_port   = var.db_port
    to_port     = var.db_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # APRE LA PORTA A TUTTI
  }

  tags = {
    Name = "RDS-Security-Group"
  }
}


# DB Subnet Group per RDS
# RDS richiede che il DB subnet group copra almeno due Availability Zones.
# Utilizzeremo le subnet private che hai già definito.
resource "aws_db_subnet_group" "main_db_subnet_group" {
  name          = "main-db-subnet-group"
  # Utilizza gli ID delle subnet private che hai creato
  subnet_ids    = aws_subnet.public_subnets[*].id
  description   = "A group of subnets for RDS"

  tags = {
    Name = "Main DB Subnet Group"
  }
}

# Parametro Group per RDS (opzionale, ma utile per configurazioni avanzate)
resource "aws_db_parameter_group" "rds_param_group" {
  name   = "rds-custom-parameter-group"
  family = "mysql8.0" # O il motore del tuo database (es. postgres14)

  parameter {
    name  = "character_set_server"
    value = "utf8mb4"
  }

  parameter {
    name  = "collation_server"
    value = "utf8mb4_unicode_ci"
  }

  tags = {
    Name = "RDS Custom Parameter Group"
  }
}

# Istanza RDS
resource "aws_db_instance" "main_db_instance" {
  allocated_storage           = 20
  identifier                  = "alo-db"
  engine                      = "mysql" # O il motore del tuo database (es. postgres)
  engine_version              = "8.0.35" # Assicurati che la versione sia compatibile
  instance_class              = "db.t3.micro"
  username                    = var.db_username
  password                    = var.db_password
  parameter_group_name        = aws_db_parameter_group.rds_param_group.name
  skip_final_snapshot         = true # NON usare in produzione, solo per sviluppo/test
  
  # Associa l'istanza RDS al DB Subnet Group e al Security Group RDS
  db_subnet_group_name        = aws_db_subnet_group.main_db_subnet_group.name
  vpc_security_group_ids      = [aws_security_group.rds_sg.id]
  
  # Le istanze RDS in un DB Subnet Group sono private per default, ma puoi renderle pubbliche per test
  # NON renderle pubbliche in produzione se non strettamente necessario e con altre misure di sicurezza
  publicly_accessible         = true 

  tags = {
    Name = "ALO-DB-Instance"
  }
}

