# -----------------------------------------------------------------------------
# VPC
# -----------------------------------------------------------------------------
variable "aws_region" {
  description = "La regione AWS in cui verranno create le risorse."
  type        = string
  default     = "eu-west-1"
}

// subnets ips definitions
variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets in different AZs."
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets in different AZs."
  type        = list(string)
  default     = ["10.0.101.0/24"]   # , "10.0.102.0/24"
}

variable "azs" {
  description = "Availability Zones to use for subnets."
  type        = list(string)
  default     = ["eu-west-1a", "eu-west-1b"]
}





# -----------------------------------------------------------------------------
# Lambda
# -----------------------------------------------------------------------------
variable "lambda_function_name" {
  description = "Il nome della funzione Lambda."
  type        = string
  default     = "word_definition"
}

variable "lambda_timeout" {
  description = "Timeout per l'esecuzione della Lambda in secondi."
  type        = number
  default     = 30
}

variable "lambda_memory_size" {
  description = "Dimensione della memoria per la Lambda in MB."
  type        = number
  default     = 128
}



# -----------------------------------------------------------------------------
# EC2
# -----------------------------------------------------------------------------
variable key_name_value {
  description = "Current key value"
  type        = string
  default     = "AAO-eu-west-1"
}


data "template_file" "user_data" {
  template = file("./../aao/user_data.sh")
}




# -----------------------------------------------------------------------------
# RDS
# -----------------------------------------------------------------------------


variable "db_username" {
  description = "Nome utente per il database RDS."
  type        = string
  default     = "admin" # Cambia con un nome utente sicuro
}

variable "db_password" {
  description = "Password per il database RDS."
  type        = string
  default     = "rootroot" 
  sensitive   = true
}

variable "db_port" {
  description = "Porta per il database RDS (es. 3306 per MySQL, 5432 per PostgreSQL)."
  type        = number
  default     = 3306
}

variable "my_ip" {
  description   = "My ip"
  type          = string
  default       = "78.208.223.201/32"
}