import React, { useState } from "react";
import awsImage from '../assets/aws.png';
import plan from '../assets/plan.png';
import Init from '../assets/init.png';
import ssh from '../assets/ssh.png';

export default function TerraformDeploymentGuide() {
  const [copiedSection, setCopiedSection] = useState(null);

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Hardcoded image URLs for the final step
  const uploadedImages = {
    init: Init,
    apply: plan,
    console: awsImage,
    ssh: ssh,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg animate-pulse">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AWS EC2 Deployment with Terraform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A complete guide to deploying EC2 instances on AWS using Infrastructure as Code with Terraform.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Setup Progress</span>
            <span className="text-sm font-medium text-gray-700">11 Steps</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-full"></div>
          </div>
        </div>

        {/* Step 1: Create IAM User */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
              Create an IAM User
            </h2>
          </div>
          <div className="p-6">
            <div className="prose prose-lg text-gray-800">
                <p>First, you need an IAM (Identity and Access Management) user with programmatic access to allow Terraform to interact with your AWS account.</p>
                <ol>
                    <li>Navigate to the <strong>IAM service</strong> in your AWS Console.</li>
                    <li>Click on <strong>Users</strong> in the sidebar and then <strong>Create user</strong>.</li>
                    <li>Enter a user name (e.g., `terraform-user`).</li>
                    <li>For <strong>Permissions options</strong>, select <strong>Attach policies directly</strong>.</li>
                    <li>Attach the <strong>AdministratorAccess</strong> policy. For production, it's recommended to use a more restrictive policy with only the necessary permissions.</li>
                    <li>Complete the user creation process.</li>
                </ol>
            </div>
             <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
               <p className="text-gray-700 flex items-start gap-2">
                 <span className="text-yellow-500 mt-1">👤</span>
                 IAM users provide secure, long-term credentials to manage AWS resources.
               </p>
             </div>
          </div>
        </div>

        {/* Step 2: Create Access Key */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
              Create and Configure Access Key
            </h2>
          </div>
           <div className="p-6">
                <p className="text-gray-800 mb-4">Once the user is created, generate an access key to authenticate your AWS CLI.</p>
                <ol className="prose text-gray-800 list-decimal pl-5">
                    <li>Select the IAM user you just created from the list.</li>
                    <li>Go to the <strong>Security credentials</strong> tab.</li>
                    <li>Click on <strong>Create access key</strong>.</li>
                    <li>Choose <strong>Command Line Interface (CLI)</strong> as the use case.</li>
                    <li>Download the `.csv` file containing the <strong>Access key ID</strong> and <strong>Secret access key</strong>. Store it securely.</li>
                </ol>
             <div className="mt-4 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
               <p className="text-gray-700 flex items-start gap-2">
                 <span className="text-pink-500 mt-1">🔐</span>
                 Your Secret Access Key is only available for download at the time of creation. Keep it safe!
               </p>
             </div>
          </div>
        </div>
        
        {/* Step 3: Configure AWS Profile */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
              Configure AWS CLI Profile
            </h2>
          </div>
          <div className="p-6">
            <div className="relative group">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto border-l-4 border-cyan-500">
{`aws configure --profile terraform_aws`}
              </pre>
              <button
                onClick={() => copyToClipboard(`aws configure --profile terraform_aws`, 'step3_new')}
                className="absolute top-3 right-3 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                {copiedSection === 'step3_new' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-400">
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-cyan-500 mt-1">💻</span>
                Run this command and enter your Access Key ID, Secret Access Key, and default region. This creates a profile that Terraform can use.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4: Create Key Pair */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-lime-500 to-lime-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">4</span>
              Create an EC2 Key Pair
            </h2>
          </div>
           <div className="p-6">
                <p className="text-gray-800 mb-4">A key pair is required to securely connect to your EC2 instance via SSH.</p>
                <ol className="prose text-gray-800 list-decimal pl-5">
                    <li>Navigate to the <strong>EC2 service</strong> in your AWS Console.</li>
                    <li>Under <strong>Network & Security</strong>, click on <strong>Key Pairs</strong>.</li>
                    <li>Click <strong>Create key pair</strong>.</li>
                    <li>Enter a name for your key pair (e.g., `kp1`, as used in the variable).</li>
                    <li>Choose the private key file format (`.pem` for OpenSSH or `.ppk` for PuTTY).</li>
                    <li>Click <strong>Create key pair</strong> and download the private key. Store it in a secure and accessible location.</li>
                </ol>
             <div className="mt-4 p-4 bg-lime-50 rounded-lg border-l-4 border-lime-400">
               <p className="text-gray-700 flex items-start gap-2">
                 <span className="text-lime-500 mt-1">🔑</span>
                 You cannot download the private key again after it's created. Ensure you save it correctly.
               </p>
             </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">5</span>
              AWS Provider Configuration
            </h2>
          </div>
          <div className="p-6">
            <div className="relative group">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto border-l-4 border-blue-500">
{`provider "aws" {
  region  = "us-east-1"
  profile = "terraform_aws"
}`}
              </pre>
              <button
                onClick={() => copyToClipboard(`provider "aws" {
  region  = "us-east-1"
  profile = "terraform_aws"
}`, 'step5')}
                className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                {copiedSection === 'step5' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-blue-500 mt-1">💡</span>
                Set the AWS region and the credentials profile you configured in the previous step.
              </p>
            </div>
          </div>
        </div>

        {/* Step 6 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">6</span>
              Fetch Latest Ubuntu AMI
            </h2>
          </div>
          <div className="p-6">
            <div className="relative group">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto border-l-4 border-green-500">
{`data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
}`}
              </pre>
              <button
                onClick={() => copyToClipboard(`data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
}`, 'step6')}
                className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                {copiedSection === 'step6' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-green-500 mt-1">💡</span>
                Grabs the latest official Ubuntu 22.04 AMI for deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Step 7 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">7</span>
              Create Security Group
            </h2>
          </div>
          <div className="p-6">
            <div className="relative group">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto border-l-4 border-purple-500">
{`resource "aws_security_group" "allow_tls" {
  name        = "allow_tls"
  description = "Allow TLS inbound traffic and all outbound traffic"
  
  tags = {
    Name = "allow_tls"
  }
}`}
              </pre>
              <button
                onClick={() => copyToClipboard(`resource "aws_security_group" "allow_tls" {
  name        = "allow_tls"
  description = "Allow TLS inbound traffic and all outbound traffic"

  tags = {
    Name = "allow_tls"
  }
}`, 'step7')}
                className="absolute top-3 right-3 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                {copiedSection === 'step7' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-purple-500 mt-1">🛡️</span>
                Defines a container for security rules for the EC2 instance.
              </p>
            </div>
          </div>
        </div>

        {/* Step 8 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">8</span>
              Ingress & Egress Rules
            </h2>
          </div>
          <div className="p-6">
            <div className="relative group">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto border-l-4 border-orange-500">
{`resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}

resource "aws_vpc_security_group_ingress_rule" "allow_ssh_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}`}
              </pre>
              <button
                onClick={() => copyToClipboard(`resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}

resource "aws_vpc_security_group_ingress_rule" "allow_ssh_ipv4" {
  security_group_id = aws_security_group.allow_tls.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}`, 'step8')}
                className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                {copiedSection === 'step8' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-orange-500 mt-1">⚠️</span>
                Allows SSH (22) and HTTPS (443) access from any IP. Restrict the `cidr_ipv4` to your own IP for better security.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 9 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">9</span>
              Launch EC2 Instance
            </h2>
          </div>
          <div className="p-6">
            <div className="relative group">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto border-l-4 border-red-500">
{`resource "aws_instance" "Sample_demo" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  key_name                    = var.key_name
  vpc_security_group_ids      = [aws_security_group.allow_tls.id]
  associate_public_ip_address = true

  tags = {
    Name = "EC2_Demo_Instance"
  }
}`}
              </pre>
              <button
                onClick={() => copyToClipboard(`resource "aws_instance" "Sample_demo" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  key_name                    = var.key_name
  vpc_security_group_ids      = [aws_security_group.allow_tls.id]
  associate_public_ip_address = true

  tags = {
    Name = "EC2_Demo_Instance"
  }
}`, 'step9')}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                {copiedSection === 'step9' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-red-500 mt-1">🖥️</span>
                Creates the actual virtual machine with a public IP and security group attached.
              </p>
            </div>
          </div>
        </div>

        {/* Step 10 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">10</span>
              Define SSH Key Pair Variable
            </h2>
          </div>
          <div className="p-6">
            <div className="relative group">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto border-l-4 border-teal-500">
{`variable "key_name" {
  description = "Name of the AWS key pair for SSH access"
  type        = string
  default     = "kp1"
}`}
              </pre>
              <button
                onClick={() => copyToClipboard(`variable "key_name" {
  description = "Name of the AWS key pair for SSH access"
  type        = string
  default     = "kp1"
}`, 'step10')}
                className="absolute top-3 right-3 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                {copiedSection === 'step10' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-teal-500 mt-1">🔑</span>
                This variable lets you define your AWS key pair (created in Step 4) for SSH access to the instance.
              </p>
            </div>
          </div>
        </div>

        {/* Step 11 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm">11</span>
                    Example Execution Screenshots
                </h2>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Terraform Init & Plan */}
                    <div className="border border-indigo-200 rounded-lg bg-indigo-50 overflow-hidden">
                        <img src={uploadedImages.init} alt="Terraform Init & Plan" className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <p className="text-gray-700 font-medium text-center">terraform init & plan</p>
                        </div>
                    </div>

                    {/* Terraform Apply */}
                    <div className="border border-indigo-200 rounded-lg bg-indigo-50 overflow-hidden">
                        <img src={uploadedImages.apply} alt="Terraform Apply" className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <p className="text-gray-700 font-medium text-center">terraform apply</p>
                        </div>
                    </div>

                    {/* AWS Console */}
                    <div className="border border-indigo-200 rounded-lg bg-indigo-50 overflow-hidden">
                        <img src={uploadedImages.console} alt="AWS Console" className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <p className="text-gray-700 font-medium text-center">AWS Console</p>
                        </div>
                    </div>

                    {/* SSH Session */}
                    <div className="border border-indigo-200 rounded-lg bg-indigo-50 overflow-hidden">
                        <img src={uploadedImages.ssh} alt="SSH Session" className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <p className="text-gray-700 font-medium text-center">SSH Session</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Terraform Command Reference */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                Terraform Command Reference
            </h3>
            
            {/* Essential Commands */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-white mb-4">Essential Commands</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
                  <code className="text-green-400 font-mono text-sm block mb-2">terraform init</code>
                  <p className="text-gray-300 text-sm">Initialize Terraform working directory</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
                  <code className="text-yellow-400 font-mono text-sm block mb-2">terraform validate</code>
                  <p className="text-gray-300 text-sm">Validate configuration files</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
                  <code className="text-blue-400 font-mono text-sm block mb-2">terraform plan</code>
                  <p className="text-gray-300 text-sm">Preview infrastructure changes</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
                  <code className="text-red-400 font-mono text-sm block mb-2">terraform apply</code>
                  <p className="text-gray-300 text-sm">Apply configuration changes</p>
                </div>
              </div>
            </div>

            {/* Management Commands */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-white mb-4">Management Commands</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
                  <code className="text-orange-400 font-mono text-sm block mb-2">terraform destroy</code>
                  <p className="text-gray-300 text-sm">Destroy infrastructure</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
                  <code className="text-purple-400 font-mono text-sm block mb-2">terraform show</code>
                  <p className="text-gray-300 text-sm">Show current state</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
                  <code className="text-cyan-400 font-mono text-sm block mb-2">terraform state list</code>
                  <p className="text-gray-300 text-sm">List resources in state</p>
                </div>
              </div>
            </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                <div className="flex justify-center mb-4">
                    <span className="text-4xl animate-bounce">✨</span>
                </div>
                <p className="text-xl text-gray-700 font-medium">
                    Keep practicing and updating this guide as you learn more about Terraform and AWS!
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        <span className="mr-2">📚</span>
                        Learning Path
                    </span>
                    <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        <span className="mr-2">🚀</span>
                        Infrastructure as Code
                    </span>
                    <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        <span className="mr-2">☁️</span>
                        AWS Cloud
                    </span>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
}