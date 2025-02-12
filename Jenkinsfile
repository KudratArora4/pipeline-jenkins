pipeline {
    agent any

    environment {
        SONARQUBE = 'Sonarqube'  
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

        // SonarQube analysis stage
        stage('Code Quality Analysis') {
            steps {
                script {
                    // Run SonarQube analysis using the configured token and environment
                    withSonarQubeEnv('Sonarqube') {
                        bat """
                        sonar-scanner.bat ^
                        -Dsonar.projectKey=dev-pipeline ^
                        -Dsonar.sources=src ^
                        -Dsonar.host.url=http://localhost:9000 ^
                        -Dsonar.login=dev-token ^
                        -Dsonar.sourceEncoding=UTF-8
                        """
                    }
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
