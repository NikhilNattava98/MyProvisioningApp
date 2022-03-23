
var JiraUserName = process.argv[4];
var JiraPassword = process.argv[5];
var Runflag = process.argv[6]
var authorization = JiraUserName + ":" + JiraPassword;

var urllib = require('urllib');
let testPlanID: string;
let testExecutionID: string;
testPlanID = process.argv[2]
testExecutionID = process.argv[3]
var arrtest = new Array()
var arrtestexcution = new Array()
urllib.request('https://dmo-jira.detss.corpintra.net/rest/raven/1.0/api/testexec/' + testExecutionID + '/test',
    {
        method: 'GET',
        auth: authorization,
        rejectUnauthorized: false,
    }, function (err: any, data: { toString: () => string; }, res: { statusCode: number; }) {
        if (res.statusCode == 200) {
            console.log("I am able to access Jira");
            var dataJSON = JSON.parse(data.toString());
            for (let valueID of dataJSON) {
                if (Runflag == 'RunAllTests') {
                    console.log("Test ID's are \n" + valueID['key']);
                    arrtest.push("@" + valueID['key'])
                } else if (valueID['status'] == 'FAIL') {
                    console.log("Failed Test ID's are \n" + valueID['key']);
                    arrtest.push("@" + valueID['key'])
                }

            }
        } else {
            console.log(err)
        }
        const fs = require('fs');
        const fileName = './package.json';
        const file = require("./package.json");
        if (arrtest.length > 1)
            file.scripts.cucumber = ".\\node_modules\\.bin\\cucumber-js --tags \"" + arrtest.join(" or ") + "\" "
        else
            file.scripts.cucumber = ".\\node_modules\\.bin\\cucumber-js --tags " + arrtest


        fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(error: any) {
            if (error) return console.log(error);
            console.log('writing to ' + fileName);
        });
        updatefeaturefile(testPlanID, testExecutionID)
    });

function getTestexecution() {
    urllib.request('https://dmo-jira.detss.corpintra.net/rest/raven/1.0/api/testplan/' + testPlanID + '/testexecution',
        {
            method: 'GET',
            auth: authorization,
            rejectUnauthorized: false,
        }, function (err: any, data: { toString: () => string; }, res: { statusCode: number; }) {
            if (res.statusCode == 200) {
                console.log("I am able to access Jira");
                var dataJSON = JSON.parse(data.toString());
                for (let valueID of dataJSON) {
                    console.log("Test Execution ID's are \n" + valueID['key']);
                    updatefeaturefile(testPlanID, valueID['key'])
                }
            } else {
                console.log(err)
            }
        });
}

function updatefeaturefile(testplanid: string, testexecutionid: string) {
    urllib.request('https://dmo-jira.detss.corpintra.net/rest/raven/1.0/api/testexec/' + testexecutionid + '/test',
        {
            method: 'GET',
            auth: authorization,
            rejectUnauthorized: false,
        }, function (err: any, data: { toString: () => string; }, res: { statusCode: number; }) {
            if (res.statusCode == 200) {
                console.log("I am able to access Jira");
                var dataJSON = JSON.parse(data.toString());
                for (let valueID of dataJSON) {
                    GetFeatureFiles(testplanid, testexecutionid, valueID['key'])
                }
            } else {
                console.log(err)
            }
        });
}
function GetFeatureFiles(testplanid: string, testexecutionid: string, testid: string) {
    const testFolder = './features/';
    const fs = require('fs');
    fs.readdirSync(testFolder).forEach((file: any) => {
        fs.readFile(testFolder + file, function (err: any, data: string | string[]) {
            if (err) throw err;
            if (data.indexOf(testid) >= 0) {
                let TestPlanData: string = data.toLocaleString().split('TestPlan').join(testplanid)
                let TestExecutionData: string = TestPlanData.replace("TestExecution", testexecutionid)
                fs.writeFile(testFolder + file, TestExecutionData, 'utf8', function (err1: any) {
                    if (err) return console.log(err1);
                });
            }
        });
    });

}


