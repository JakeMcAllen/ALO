# --- Output URL ---
output "api_gateway_url" {
  description = "L'URL dell'API Gateway per l'endpoint /wd"
  value       = "${aws_api_gateway_stage.wd_stage.invoke_url}/${aws_api_gateway_resource.wd_resource.path_part}"
}


# Output per l'endpoint RDS
output "db_endpoint" {
  description                 = "Endpoint del database RDS"
  value                       = aws_db_instance.main_db_instance.address
}

output "db_port" {
  description                 = "Porta del database RDS"
  value                       = aws_db_instance.main_db_instance.port
}

output "rds_hostname" {
  description                 = "The hostname (endpoint) of the RDS database instance."
  value                       = aws_db_instance.main_db_instance.address
  sensitive                   = false
}
