pipeline {
    agent any

    environment {
        SONARQUBE = 'Sonarqube'  
        SONAR_SCANNER_PATH = "C:\\Users\\KUDRAT ARORA\\Downloads\\sonar-scanner-cli-6.2.1.4610-windows-x64\\sonar-scanner-6.2.1.4610-windows-x64\\bin"  // Full path to sonar-scanner.bat
    }

    stages {
        stage('Checkout') {
            steps {
                //Checkout the code from Git repository
                git 'https://github.com/KudratArora4/pipeline-jenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    //Install Node.js dependencies (using Windows batch command)
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    //Run npm build command (Windows batch)
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    //Run the Jest tests (Windows batch)
                    bat 'npm test -- --ci --runInBand --coverage'
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                script {
                    //Use the dev-token stored in Jenkins credentials
                    withSonarQubeEnv('Sonarqube') {
                        withCredentials([string(credentialsId: 'dev-token', variable: 'SONAR_TOKEN')]) {
                            
                            bat """
                                set SONAR_TOKEN=${SONAR_TOKEN}
                                "%SONAR_SCANNER_PATH%\\sonar-scanner.bat" -D"sonar.projectKey=dev-pipeline" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=%SONAR_TOKEN%" -D"sonar.sourceEncoding=UTF-8"
                            """
                        }
                    }
                }
            }
        }
    }

    post {
    success {
        emailext (
            subject: "Jenkins Build Successful - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "Good news! The Jenkins pipeline for ${env.JOB_NAME} completed successfully.",
            to: "arorakudrat19@gmail.com"
        )
    }

    failure {
        emailext (
            subject: "Jenkins Build Failed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "Oops! The Jenkins pipeline for ${env.JOB_NAME} failed.",
            to: "arorakudrat19@gmail.com"
        )
    }
}

}
