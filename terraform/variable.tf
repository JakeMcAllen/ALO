// subnets ips definitions
variable "public_subnet_cidrs" {
 type        = list(string)
 description = "Public Subnet CIDR values"
 default     = ["10.0.1.0/24"]
}
variable "private_subnet_cidrs" {
 type        = list(string)
 description = "Private Subnet CIDR values"
 default     = ["10.0.4.0/24"]
}

variable "azs" {
 type        = list(string)
 description = "Availability Zones"
 default     = ["eu-south-1a"]
}

// S3
variable "s3_bucket_name" {
  description = "Il nome del bucket S3 da utilizzare per l'archiviazione degli zip della lambda."
  type        = string
  default     = "allena-lessons-online"
}


// Lambda
data "aws_region" "current" {}


# Variabili per la configurazione della Lambda
variable "lambda_function_name" {
  description = "Nome della funzione Lambda"
  type        = string
  default     = "word_dictionary2"
}

variable "lambda_runtime" {
  description = "Runtime della funzione Lambda"
  type        = string
  default     = "python3.9" # Assicurati che sia compatibile con NLTK
}

variable "lambda_handler" {
  description = "Handler della funzione Lambda (file.funzione)"
  type        = string
  default     = "word_dictionary.lambda_handler" # Assicurati che corrisponda al tuo file Python
}

variable "lambda_memory_size" {
  description = "Dimensione della memoria per la funzione Lambda (MB)"
  type        = number
  default     = 256 # Potrebbe essere necessario aumentarla per NLTK
}

variable "lambda_timeout" {
  description = "Timeout per la funzione Lambda (secondi)"
  type        = number
  default     = 30 # Potrebbe essere necessario aumentarlo per il download iniziale se non incluso
}
