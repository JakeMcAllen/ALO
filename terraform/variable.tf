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
  default     = ["10.0.1.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets in different AZs."
  type        = list(string)
  default     = ["10.0.101.0/24"]
}

variable "azs" {
  description = "Availability Zones to use for subnets."
  type        = list(string)
  default     = ["eu-west-1a"]
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