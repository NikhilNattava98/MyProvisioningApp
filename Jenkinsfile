pipeline {
    options {
         buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timeout(time: 15, unit: 'MINUTES')
    }

    environment {
        JIRA_URL = "https://dmo-jira.detss.corpintra.net/browse/${TestPlanID}"
        JIRA_TESTEXEC = "https://dmo-jira.detss.corpintra.net/rest/api/2/issue/${TestExecutionID}/attachments"
    }
    agent {
        dockerfile {
                    dir '.'
                    filename 'Dockerfile.jenkins'
        }
    }
    stages {
        /**
        * This stage is used to get the list of Tests key from Jira according to TestExecution ID Parameter
        * Command 'set +x' is used to hide the command from the Jenkins console because we use credentials in the command
        * */
        stage('GetXrayTest') {
            steps {
               sh label: '', script: '''set +x
                                        npx ts-node Curl.ts ${TestPlanID} ${TestExecutionID} ${JiraUserName} ${JiraPassword} ${TestsTobeRun}'''
            }
        }
        /**
        * This stage is used to send a notification to MatterMost channel and start the test run
        * */
        stage('TestExecution') {
            steps {
                script{
                    mattermostSend endpoint: 'https://matter.i.daimler.com/hooks/qe5316qfni85jget655fwyndac', channel: 'mbvmmbrdi---test-automation-jenkins', color: '#2A42EE', message: "Automation Build Started: \n Job Name: ${env.JOB_NAME} \n Build Number: ${env.BUILD_NUMBER} \n Build URL: (<${env.BUILD_URL}|Link to build>)", text: '@sachins @njayago'
                    // sh label: '', script: '''npm config set NO_PROXY = *.corpintra.net
                    //                      npm run e2e'''
                    sh 'npm run e2e'
                }
            }
        }
        /**
        * This stage is used to update cucumber report on Jenkins after the test run
        * */
        stage('PublishCucumberReport'){
			steps{
                cucumber buildStatus: 'FAILURE',
                failedFeaturesNumber: -1, 
                failedScenariosNumber: -1, 
                failedStepsNumber: -1, 
                fileIncludePattern: '**/cucumber-report.json', 
                jsonReportDirectory: 'reports', 
                pendingStepsNumber: -1, 
                skippedStepsNumber: -1, 
                sortingMethod: 'ALPHABETICAL', 
                undefinedStepsNumber: -1
			}
		}
        stage('UploadResultsToJira') {
            steps {
                sh label: '', script: '''set +x
                                         curl -k --noproxy '*' -H "Content-Type:application/json" -X POST -u ${JiraUserName}:${JiraPassword} --data @reports/cucumber-report.json https://dmo-jira.detss.corpintra.net/rest/raven/1.0/import/execution/cucumber'''
            }
        }
        stage('JiraUpdate'){
            steps{
                script{
                    REPORT_NAME = sh (label: 'GetLatestResultFileName', returnStdout: true, script: 'basename reports/*.html').trim()
                    sh "set +x ; curl -k --noproxy '*' -u ${JiraUserName}:${JiraPassword} -X POST -H 'X-Atlassian-Token: nocheck' -F 'file=@reports/${REPORT_NAME}' ${env.JIRA_TESTEXEC}"
                    sh "set +x ; curl -k --noproxy '*' -H 'Content-Type: application/json' -u ${JiraUserName}:${JiraPassword} -d '{\"body\":\"Please find the Jenkins build URL:${env.BUILD_URL}\"}' https://dmo-jira.detss.corpintra.net/rest/api/2/issue/${TestExecutionID}/comment"
                }
            }
        }
        stage('CleanupReports'){
            steps{
                sh label: '', script: 'rm reports/*.html'
            }
        }   
    }
}
   
