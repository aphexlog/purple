terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region  = "us-east-1"
  profile = "elevator-robot"
}

resource "aws_instance" "example" {
  ami           = "ami-0a0cf2b8bc4634fe1"
  instance_type = "t2.micro"
}