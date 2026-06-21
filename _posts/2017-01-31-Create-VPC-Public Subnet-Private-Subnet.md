---
layout: post
title: "Create VPC - private - public subnet and NAT "
comments: true
description: ""
keywords: "Amazon-aws, vpc, subnet ,nat "
---



**Amazon OpsWorks**lets you easily orchestrate the different parts of your application using**Chef**to perform the actual automation. It presents the different AWS resources that make up your app as multiple layers, each composed of resources. A typical app might have two layers, an app server layer \(where your Ruby/NodeJS/Python/PHP app actually runs\) and a database layer \(backed by RDS\). Typically, you'd manage each instance and RDS installation separately, but with OpsWorks you can manage all instances in the "app server" layer together.

The advantage of using Chef is that you can use AWS' published[OpsWorks cookbooks](https://github.com/aws/opsworks-cookbooks), open source community cookbooks, build your own, or mix and match. AWS publishes cookbooks for typical Rails applications, Nginx proxies, memcached servers, monitoring, haproxy, and more.

But before we get started building our first OpsWork stack, I'd like to remind you that it is just a collection of resources, and often doesn't create underlying resources like VPC networks automatically do. So we'll need to digress and make a VPC for all our instances to inhabit first.

Amazon Virtual Private Cloud \(Amazon VPC\) enables you to launch AWS resources into a virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center -- with the benefits of using the scalable infrastructure of AWS. It is logically isolated from other virtual networks in the AWS cloud.

You can create a new VPC using the AWS Management Console.

Select the VPC service from the Management Console dashboard:

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-dashboard-vpc-5ed4f02d-8a5f-4a10-ab05-c25a7cb4842f.png "AWS Management Console dashboard - VPC")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-dashboard-vpc-5ed4f02d-8a5f-4a10-ab05-c25a7cb4842f.png)

From the VPC dashboard, click on**Your VPCs**link in the sidebar menu.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-dashboard-9fe7eb8c-c8f6-4144-8131-c8a0f5f5314a.png "AWS VPC dashboard")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-dashboard-9fe7eb8c-c8f6-4144-8131-c8a0f5f5314a.png)

**Your VPCs** page lists all previously created VPCs \(any new AWS account comes with a default fully-working VPC\); click on the **Create VPC **blue button to begin creating a new VPC.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-list-ceef9798-21bd-4ac4-b6cf-847c40193b30.png "AWS VPC - Your VPCs - Create VPC")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-list-ceef9798-21bd-4ac4-b6cf-847c40193b30.png)

In the Create VPC dialog box, specify the following VPC details as necessary, then click **Yes, Create**.

* **Name tag**
  :
  `cloudacademy-labs`
  . This is the name for your VPC; doing so creates a tag with a key of Name and the value that you specify.
* **CIDR block**
  : 
  `10.0.0.0/16`
  . You should specify a CIDR block from the private \(non-publicly routable\) IP address ranges as specified in RFC 1918.
* **Tenancy**
  :
  `default`
  . Dedicated tenancy ensures your instances run on single-tenant hardware. 

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-create-1-c4d04aba-dfd0-4364-9e1a-6a6f42a4d62c.png "AWS VPC - Create VPC Wizard - Step 1")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-create-1-c4d04aba-dfd0-4364-9e1a-6a6f42a4d62c.png)

Amazon creates the requested VPC and the following linked services:

* a
  **DHCP options set**
   \(this set enables DNS for instances that need to communicate over the VPC's Internet gateway\) 
* a
  **Route Table  **
  \(it contains a set of rules, called 
  _routes_
  , that are used to determine where network traffic is directed\) 
* a
  **Network ACL  **
  \(it is a list of rules to determine whether traffic is allowed in or out of any subnet associated with the network ACL\)

Note that no Subnets or Internet Gateways are automatically created -- you need to add them autonomously.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-list-ceef9798-21bd-4ac4-b6cf-847c40193b30.png "AWS VPC - VPC List ")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-list-ceef9798-21bd-4ac4-b6cf-847c40193b30.png)

Now you are ready to create your VPC subnets and customize the routing table.

## Create a VPC Internet Gateway

An**Internet Gateway**is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the Internet. It imposes no availability risks or bandwidth constraints on your network traffic. An Internet gateway serves two purposes: to provide a target in your VPC route tables for Internet-routable traffic, and to perform network address translation \(NAT\) for instances that have been assigned public IP addresses.

You can create a new**Internet Gateway** for your previously created VPC using the AWS Management Console.

Select the VPC service from the AWS Management Console dashboard:

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-dashboard-vpc-86d74a53-2934-4a8b-b158-7c66b6354f99.png "AWS Management Console dashboard - VPC")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-dashboard-vpc-86d74a53-2934-4a8b-b158-7c66b6354f99.png)

From the VPC dashboard, click the **Internet Gateways** link in the sidebar menu.

The**Internet Gateways** page lists all previously created gateways. Click on the **Create Internet Gateway **blue button to begin creating a new gateway.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-igw-dashboard-44a8138a-4640-415c-a718-86ea8ff839f4.png "AWS VPC - Internet Gateway dashboard")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-igw-dashboard-44a8138a-4640-415c-a718-86ea8ff839f4.png)

Creating a gateway is a one step operation, you only need to choose a meaningful name.

Use`labs-gw`as**Name tag**and then click **Yes, Create**.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-igw-create-a0f5d0e6-128f-49fc-ae2e-637de23484d5.png "AWS VPC - Create an Internet Gateway")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-igw-create-a0f5d0e6-128f-49fc-ae2e-637de23484d5.png)

### How to attach the Internet Gateway to a VPC

Select the Internet gateway that you just created, and then click **Attach to VPC**.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-igw-created-aa480cb9-d559-4214-b6d8-9f8d59ac8e13.png "AWS VPC - Internet Gateway created")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-igw-created-aa480cb9-d559-4214-b6d8-9f8d59ac8e13.png)

In the Attach to VPC dialog box, select the VPC`cloudacademy-labs` from the list, and then click **Yes, Attach**.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-igw-attach-c7c18b31-ea40-4a3b-a563-b0f4d8b48fe4.png "AWS VPC - Internet Gateway: attach to VPC")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-igw-attach-c7c18b31-ea40-4a3b-a563-b0f4d8b48fe4.png)

Your new Internet Gateway is ready to be used by the EC2 instances of the selected VPC.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-igw-attached-34a31271-3b95-483b-ac00-4f50e4f581fa.png "AWS VPC - Internet Gateway attached to VPC")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-igw-attached-34a31271-3b95-483b-ac00-4f50e4f581fa.png)

## Create a Public Subnet

You can create a subnet for your VPC using the AWS Management Console.

Select the VPC service from the Management Console dashboard:

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-dashboard-vpc-5dbe50a5-bf8c-484a-94ed-5c6fa60c1a1a.png "AWS Management Console dashboard - VPC")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-dashboard-vpc-5dbe50a5-bf8c-484a-94ed-5c6fa60c1a1a.png)

From the VPC dashboard, click on **Subnets** link in the sidebar menu.

**Your Subnets** page lists all previously created subnets, you can use the **Filter by VPC** feature for listing only the services linked to a specific VPC.

Click on the **Create Subnet  **blue button for starting the creation of a new subnet.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-subnet-list-f60b34be-9bf6-4f07-981f-aab239244b52.png "AWS  VPC - Subnet list")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-vpc-subnet-list-f60b34be-9bf6-4f07-981f-aab239244b52.png)

In the Create Subnet dialog box, specify the following Subnet details then click **Yes, Create**.

* **Name tag**
  : 
  `Public-A`
  . This is the name for your subnet; doing so creates a tag with a key of Name and the value that you specify.
* **VPC**
  : 
  `cloudacademy-labs`
  . 
* **Availability Zone**
  : 
  `us-west2a`
  . 
* **CIDR block**
  : 
  `10.0.20.0/24`
  . You should specify a CIDR block in the selected VPC.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-subnet-public-a-1e532894-6154-4abb-840d-2bd21f140f21.png "create public subnet")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-subnet-public-a-1e532894-6154-4abb-840d-2bd21f140f21.png)

As you can see, the created subnet is automatically attached to the default VPC Route table and the default Network ACL.

A route table contains a set of rules, called routes, that are used to determine where network traffic is directed. Each route in a table specifies a destination CIDR and a target \(for example, traffic destined for 172.16.0.0/12 is targeted for the virtual private gateway\).  If a subnet have a route with the destination \(0.0.0.0/0\) and target the Internet Gateway, the subnet is known as a **public subnet.**

We can create a custom route table for VPC using the Amazon VPC console.

In the navigation pane, choose Route Tables.

1. Choose **Create Route Table**.

2. In the Create Route Table dialog box, you can optionally name your route table with **Name tag**: `Public-RouteTable`. This is the name for your subnet; doing so creates a tag with a key of Name and the value that you specify.

3. Select **VPC**: `cloudacademy-labs`from the VPC list, and then choose **Yes, Create**.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-subnet-public-create-route-table-73c3053d-9f87-4e3e-a9ec-fcb820906beb.png "create route table")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-subnet-public-create-route-table-73c3053d-9f87-4e3e-a9ec-fcb820906beb.png)

Now we must change the default route table of public subnet with the new route table. To change a subnet route table association

1. In the navigation pane, choose **Subnets**, and then select the subnet `Public-A`

2. In the Route Table tab, choose **Edit**.

3. Select the route table  
   `Public-RouteTable`  
   from the Change to list, and then choose Save.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-subnet-public-route-table-association-0c5636a0-4e96-47ba-9688-046b3a693900.png "public route association")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-subnet-public-route-table-association-0c5636a0-4e96-47ba-9688-046b3a693900.png)

As you can see, the subnet only has local routing \(Destination 10.0.0.0/16 with Target local\) so we need a route to internet with destination the Internet Gateway associated to our VPC.

We can add the route to internet:

1. In the navigation pane, choose **Route Tables**, and then select the route table `Public-RouteTable`

2. In the Routes tab, choose **Edit**.

3. Choose **Add another route** to add more routes

4. In the new rule set destination to`0.0.0.0/0` and Target to`labs-gw` then choose Save when you're done.

Now our subnet is a public subnet with route to Internet.

## Create Network ACL for Public

A network access control list \(ACL\) is an optional layer of security that acts as a firewall for controlling traffic in and out of a subnet. It is a numbered list of rules, evaluated in order to determine if traffic is allowed in or out of any associated subnet.

The VPC comes with a modifiable default network ACL and each subnet must be associated with a network ACL. As you can see from the image below, if you don't explicitly associate a subnet with a network ACL, the subnet is automatically associated with the default network ACL that allows all inbound and outbound traffic.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nacl-private-default-e9e9ad62-8680-4ded-934f-6edd04528eaa.png "default nacl")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nacl-private-default-e9e9ad62-8680-4ded-934f-6edd04528eaa.png)

You can create custom network ACL at any time directly from Web Console:

1. In the navigation pane, choose Network ACLs.

2. Choose **Create Network ACL**.

3. In the Create Network ACL dialog box, optionally name your network ACL `Public-NACL` and then select `cloudacademy-labs` from the VPC list, and choose **Yes, Create**.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/blobid0-b47401eb-4a94-4a04-bc5e-d84dcc5a0eba.png)](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/blobid0-b47401eb-4a94-4a04-bc5e-d84dcc5a0eba.png)

By default, a network ACL is not associated with a subnet until you explicitly associate it with one. To associate a subnet with a network ACL

1. In the navigation pane, choose Network ACLs, and then select the network ACL  `Public-NACL`

2. In the details pane, on the Subnet Associations tab, choose **Edit**.

3. Select the Associate check box for the subnet `Public-A` to associate with the network ACL, and then choose **Save.**

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nacl-subnet-association-0003277a-a962-4ac9-a3e9-9a841a42aa32.png "Nacl subnet association")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nacl-subnet-association-0003277a-a962-4ac9-a3e9-9a841a42aa32.png)

Now you can configure your rules remembering that a Network ACLs is a numbered list of rules that we evaluate in order and are stateless: responses to allowed inbound traffic are subject to the rules for outbound traffic \(and vice versa\).

## Add rules to Public Network ACL

A network ACL is a numbered list of rules that are evaluated in order, starting with the lowest numbered rule, to determine whether traffic is allowed in or out of any subnet associated with the network ACL. We recommend that you start by creating rules with rule numbers that are multiples of 100, so that you can insert new rules where you need to later on.

To add Inbound rules to a network ACL

1. In the navigation pane, choose **Network ACLs**.

2. From Network ACL list, select the ACL with Name   
   `Public-NACL.`

3. In the details pane, choose the Inbound Rules and then choose **Edit**.

4. In Rule \#, enter the rule number `100.`

5. From the Type list, select `ALL Traffic` rule.

6. In the Source field enter the CIDR range `0.0.0.0/0`

7. From the Allow/Deny list, select ALLOW to allow the specified traffic or DENY to deny the specified traffic.

1. Choose 
   **Save**
    to save the new rule.

To add another rule, choose Add another rule, and repeat steps 4 to 8 as required.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nacl-public-inbound-rules-8dcc5289-65d1-4c1e-89e5-52139f75c8fd.png "Inbound rule")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nacl-public-inbound-rules-8dcc5289-65d1-4c1e-89e5-52139f75c8fd.png)

To add Outbound rules to a network ACL

1. In the navigation pane, choose **Network ACLs**.

2. From the Network ACL list, select the ACL with Name   
   `Public-NACL.`

3. In the details pane, choose the Outbound Rules and then choose **Edit**.

4. In Rule \#, enter the rule number `100`

5. From the Type list, select `ALL Traffic` rule.

6. In the Destination field enter the CIDR `0.0.0.0/0`

7. From the Allow/Deny list, select ALLOW to allow the specified traffic or DENY to deny the specified traffic.

8. Choose   
   **Save**  
    to save the new rule

   To add another rule, choose Add another rule, and repeat steps 4 to 9 as required.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nacl-public-outbound-rules-ac9bb140-674f-43e9-8b3e-9c760cea0ca2.png "Outbound rule")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nacl-public-outbound-rules-ac9bb140-674f-43e9-8b3e-9c760cea0ca2.png)

When you add or remove rules from a network ACL, the changes are automatically applied to the subnets it's associated with.

## Launch NAT instance

Instances that you launch into a private subnet in a virtual private cloud \(VPC\) can't communicate with the Internet. You can optionally use a network address translation \(NAT\) instance in a public subnet in your VPC to enable instances in the private subnet to initiate outbound traffic to the Internet, but prevent the instances from receiving inbound traffic initiated by someone on the Internet.

You can launch an EC2 instance using the EC2 launch wizard, selecting the EC2 service from the Management Console dashboard:

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/ec2-service-b7936338-c1b2-4e94-ae03-43e586a62b7b.png "EC2 service")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/ec2-service-b7936338-c1b2-4e94-ae03-43e586a62b7b.png)

From the dashboard, click **Launch Instance**.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-ec2-dashboard-77c77830-06ad-45a7-a726-f596aa1c0ec5.png "AWS EC2 dashboard")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-ec2-dashboard-77c77830-06ad-45a7-a726-f596aa1c0ec5.png)

The **Select an Amazon Machine Image \(AMI\)** page displays a list of basic configurations called **Amazon Machine Images \(AMIs\)** that serve as templates for your instance.

To select an NAT Instance click on **Community AMIs**, then input "NAT" in the search field and**select**the `amzn-ami-vpc-nat-hvm-2014.09.1.x86_64-gp2` AMI.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nat-instance-on-public-subnet-42926695-388c-4b5e-bf2d-ba3c193c5e5c.png "vpn nat instance")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nat-instance-on-public-subnet-42926695-388c-4b5e-bf2d-ba3c193c5e5c.png)

On the **Select an Instance Type** page, do not change any option and click**Next: Configure Instance Details.**

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-ec2-instance-wizard-2-1fe16c5a-4597-4eca-a582-46cec61c5ed2.png "AWS EC2 Launch instance: Step 2")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/aws-ec2-instance-wizard-2-1fe16c5a-4597-4eca-a582-46cec61c5ed2.png)

On the **3. Configure Instance** tab, check the selected **Network \(VPC\)**`cloudacademy-labs`and **Subnet**`Public-A`verify thatAuto-assign Public IP is set to Enable, then click **Next: Add Storage**.

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nat-instance-on-public-subnet-details-2cae6735-2733-41c5-b81e-c78ee13de0bb.png "NAT instance details")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nat-instance-on-public-subnet-details-2cae6735-2733-41c5-b81e-c78ee13de0bb.png)

On the **4. Add Storage **tab, do not change any option and click **Next: Tag Instance** button.

On the**5. Tag Instance**use Key "Name" and Value "NAT Instance" and click**Next: Configure Security Group**

On the**6. Security Group, **select** Create a new security group**using name NAT and descriptions "Only for NAT" furthermore on Rule leave SSH Type and 0.0.0.0/0 on source and insert a new rule with type "ALL Traffic" and source with Custom IP to `10.0.0.0/16`then click**Review and Launch**

On the Review Instance Launch page, click **Launch**.

In the **Select an existing key pair or create a new key pair** dialog box, select **Create a new key pair**, then choose a KeyPair name and download it.

Select the acknowledgment checkbox, and then click **Launch Instances**.

A confirmation page will let you know that your instance is launching. Click **View Instances** to close the confirmation page and return to the console.

Now it's important to disable the Source destination Check on NAT Instance

1. Select the NAT instance, choose Actions, select
   **Networking**
   , and then select
   **Change Source/Dest. Check**
   .

1. Verify that this attribute is disabled. Otherwise, choose
   **Yes, Disable.**

[![](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nat-instance-on-public-subnet-change-source-destination-08aeab8c-9b1a-4818-bd85-e6dff41b8f3c.png "change source destination")](https://d2wxe3cu71edbr.cloudfront.net/media/uploads/lab-step/vpc-nat-instance-on-public-subnet-change-source-destination-08aeab8c-9b1a-4818-bd85-e6dff41b8f3c.png)

Now you can use this instance for NAT


