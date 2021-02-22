import * as express from 'express';
import * as cors from 'cors';
var app = express();

app.use(cors({
  origin : true,
  credentials: true
}));

// Load the AWS SDK for Node.js
import * as AWS from 'aws-sdk';
import { DescribeInstancesResult } from 'aws-sdk/clients/ec2';


// Set the region
AWS.config.update({ region: "ap-northeast-2" });

// Create EC2 service object
var ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });

interface DescribeInstanceParam {
  DryRun: boolean;
}

var params: DescribeInstanceParam = {
  DryRun: false,
};

const describeEc2Instances = (params: DescribeInstanceParam): Promise<DescribeInstancesResult> => {
  return new Promise((resolve, reject) => {
    ec2.describeInstances(params, function (err: AWS.AWSError, data: DescribeInstancesResult) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

app.get("/instance_status", (req: express.Request, res: express.Response) => {
  describeEc2Instances(params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
