provider "aws" {
  region = "us-east-1"
  profile = "elevator-robot"
}
resource "aws_s3_bucket" "elevator-robot-test" {
  bucket = "elevator-robot"
  acl    = "public-read"
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
  force_destroy = true
  provisioner "local-exec" {
    command = "aws s3 sync dist s3://elevator-robot --acl public-read --profile elevator-robot"
  }
}

output "name" {
  value = aws_s3_bucket.elevator-robot-test.bucket
}
output "URL" {
  value = aws_s3_bucket.elevator-robot-test.website_endpoint
}
