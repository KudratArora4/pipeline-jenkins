pipeline {
    agent any

    environment {
        SONARQUBE = 'Sonarqube'  
        SONAR_SCANNER_PATH = "C:\\Users\\KUDRAT ARORA\\Downloads\\sonar-scanner-cli-6.2.1.4610-windows-x64\\sonar-scanner-6.2.1.4610-windows-x64\\bin"
        DOCKER_IMAGE = "my-react-app"
        NETLIFY_SITE_ID = "02554686-0c24-4ca0-8f13-86e0bb79b0a9"  
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token') 
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/KudratArora4/pipeline-jenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    bat 'npm test -- --ci --runInBand --coverage'
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                script {
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

        stage('Deploy with Docker') {
            steps {
                script {
                    bat "docker build -t ${IMAGE_NAME} ."
                    bat "docker stop ${CONTAINER_NAME} || echo No container to stop"
                    bat "docker rm ${CONTAINER_NAME} || echo No container to remove"
                    bat "docker run -d -p ${APP_PORT}:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}"
                    echo "Application deployed successfully at: http://localhost:${APP_PORT}"     
                }
            }
        }

        stage('Release on Netlify') {
            steps {
                script {
                    bat """
                        netlify deploy --prod --dir=build --site ${NETLIFY_SITE_ID} --auth ${NETLIFY_AUTH_TOKEN}
                    """
                }
            }
        }
    }

    post {
        success {
            script {
                echo "Site Deployed at: http://localhost:3000"
                echo "Site Released at: https://${NETLIFY_SITE_ID}.netlify.app"
            }
            emailext (
                subject: "Jenkins Build & Deployment Successful - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                Good news! The Jenkins pipeline for ${env.JOB_NAME} completed successfully.
                
                - **Docker Deployment URL:** http://localhost:3000
                - **Netlify Release URL:** https://${NETLIFY_SITE_ID}.netlify.app
                
                View logs in Jenkins for details.
                """,
                to: "arorakudrat19@gmail.com"
            )
        }

        failure {
            emailext (
                subject: "Jenkins Build Failed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Oops! The Jenkins pipeline for ${env.JOB_NAME} failed. Check the logs for more details.",
                to: "arorakudrat19@gmail.com"
            )
        }
    }
}
