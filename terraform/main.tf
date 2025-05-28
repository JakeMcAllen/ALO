provider "aws" {
    region = "eu-south-1"
    access_key = "AKIATCKANY6BUNA4XL7X"
    secret_key = "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"
}

// --- VPC ---
// Main vpc
resource "aws_vpc" "main_VPC" {
    cidr_block = "10.0.0.0/16"

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



// --- ZIP files ---
data "archive_file" "wd" {
  type = "zip"

  source_dir = "./../aao"
  output_path = "./zip/alo.zip"
}

data "archive_file" "alo" {
  type = "zip"

  source_dir = "./../word_dictionary"
  output_path = "./zip/word_dictionary.zip"
}





// --- EC2
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



resource "aws_instance" "project_server" {
  depends_on = [aws_security_group.my-sg, aws_subnet.public_subnets]
  ami = "ami-0e86e20dae9224db8" # Amazon Ubuntu AMI
  instance_type = "t2.micro"
  count = length(var.public_subnet_cidrs)
  subnet_id = element(aws_subnet.public_subnets[*].id, count.index)
  associate_public_ip_address = true
  key_name = "terraform-kp"
  vpc_security_group_ids = [aws_security_group.my-sg.id]
}

