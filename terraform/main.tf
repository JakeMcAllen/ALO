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

# --- Output URL ---
output "api_gateway_url" {
  description = "L'URL dell'API Gateway per l'endpoint /wd"
  value       = "${aws_api_gateway_stage.wd_stage.invoke_url}/${aws_api_gateway_resource.wd_resource.path_part}"
}






# -----------------------------------------------------------------------------
# EC2
# -----------------------------------------------------------------------------
resource "aws_security_group" "my-sg" {
  vpc_id = aws_vpc.main_VPC.id
  name = "my security group"
  description = "my security group"
  ingress {
    description = "HTTP"
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow traffic from anywhere
  }
  ingress {
    description = "HTTPS"
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "SSH"
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "my-sg"
  }
}


data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}


resource "aws_instance" "project_server" {
  depends_on                  = [aws_security_group.my-sg, aws_subnet.public_subnets]
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t3.micro"
  count                       = length(var.public_subnet_cidrs)
  subnet_id                   = element(aws_subnet.public_subnets[*].id, count.index)
  associate_public_ip_address = true
  key_name                    = var.key_name_value
  vpc_security_group_ids      = [aws_security_group.my-sg.id]

  user_data = <<-EOF
    #!/bin/bash
    sudo apt update -y
    sudo apt upgrade -y
    sudo apt install -y nodejs npm
    sudo apt install -y nodejs
    sudo apt install -y git
    sudo apt install -y pm2
    
    mkdir ALO
    cd ALO/aao/

  EOF


  tags = {
    Name = "ALO-server"
  }
}