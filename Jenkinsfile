pipeline {
    agent any

    environment {
        SONARQUBE = 'Sonarqube'  // Name of the SonarQube configuration in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from Git repository
                git 'https://github.com/KudratArora4/pipeline-jenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies (using Windows batch command)
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Run npm build command (Windows batch)
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run the Jest tests (Windows batch)
                    bat 'npm test -- --ci --runInBand --coverage'
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                script {
                    // Use the dev-token stored in Jenkins credentials
                    withSonarQubeEnv('Sonarqube') {
                        withCredentials([string(credentialsId: 'dev-token', variable: 'SONAR_TOKEN')]) {
                            // Pass the SonarQube token as an environment variable to avoid Groovy string interpolation
                            bat """
                                set SONAR_TOKEN=${SONAR_TOKEN}
                                sonar-scanner.bat -D"sonar.projectKey=dev-pipeline" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=%SONAR_TOKEN%" -D"sonar.sourceEncoding=UTF-8"
                            """
                        }
                    }
                }
            }
        }

        // Optionally, you can add an additional stage to wait for the analysis report to be generated
        stage('Quality Gate') {
            steps {
                script {
                    // Wait for SonarQube quality gate to finish
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        success {
            echo 'Build, Tests, and Code Quality Analysis completed successfully!'
        }
        failure {
            echo 'Build or Tests failed.'
        }
    }
}
