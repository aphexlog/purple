resource "aws_vpc" "super_awesome_vpc" {
    cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "super_awesome_igw" {
    vpc_id = aws_vpc.super_awesome_vpc.id
}

resource "aws_subnet" "public_subnet" {
    vpc_id = aws_vpc.super_awesome_vpc.id
    cidr_block = "10.0.16.0/20"
}

resource "aws_route_table" "super_awesome_route_table_public" {
    vpc_id = aws_vpc.super_awesome_vpc.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.super_awesome_igw.id
    }
}

resource "aws_route_table_association" "super_awesome_route_table_association_public" {
    subnet_id = aws_subnet.public_subnet.id
    route_table_id = aws_route_table.super_awesome_route_table_public.id
}

resource "aws_route_table" "super_awesome_route_table_private" {
    vpc_id = aws_vpc.super_awesome_vpc.id
    route {
        cidr_block = aws_subnet.private_subnet.cidr_block
        nat_gateway_id = aws_nat_gateway.super_awesome_nat.id
    }
}

resource "aws_route_table_association" "super_awesome_route_table_association_private" {
    subnet_id = aws_subnet.private_subnet.id
    route_table_id = aws_route_table.super_awesome_route_table_private.id
}

resource "aws_eip" "super_awesome_eip" {}

resource "aws_nat_gateway" "super_awesome_nat" {
    subnet_id = aws_subnet.public_subnet.id
    allocation_id = aws_eip.super_awesome_eip.id
}

resource "aws_subnet" "private_subnet" {
    vpc_id = aws_vpc.super_awesome_vpc.id
    cidr_block = "10.0.128.0/20"
}

resource "aws_security_group" "lambda_sg" {
    name = "lambda_sg"
    vpc_id = aws_vpc.super_awesome_vpc.id
}

resource "aws_iam_role" "lambda_role" {
    assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}

EOF
}

resource "aws_iam_policy" "aws_iam_role_policy" {
    policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*",
            "Effect": "Allow"
        }
    ]
}

EOF
}

resource "aws_iam_role_policy_attachment" "attach_logging_policy" {
    role       = aws_iam_role.lambda_role.name
    policy_arn = aws_iam_policy.aws_iam_role_policy.arn
}

resource "aws_iam_role_policy_attachment" "attach_lambda_vpv_policy" {
    role       = aws_iam_role.lambda_role.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

resource "aws_lambda_function" "awesome_function" {
    function_name = "awesome_function"
    role          = aws_iam_role.lambda_role.arn
    vpc_config {
        subnet_ids = [aws_subnet.public_subnet.id]
        security_group_ids = [aws_security_group.lambda_sg.id]
    }
    runtime = "nodejs16.x"
    handler = "index.handler"
    filename = "index.zip"
}