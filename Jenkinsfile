pipeline {
    agent any

    environment {
        SONARQUBE = 'SonarQube'  // Name of the SonarQube server configuration in Jenkins
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_PROJECT_KEY = 'dev-pipeline'  // Replace with your project key from SonarQube
        SONAR_TOKEN = credentials('sonar-token')  // Reference to your stored Jenkins secret
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

        // Add the SonarQube analysis stage
        stage('Code Quality Analysis') {
            steps {
                script {
                    // Run SonarQube analysis
                    withSonarQubeEnv(SONARQUBE) {
                        bat """
                        sonar-scanner.bat ^
                        -Dsonar.projectKey=${SONAR_PROJECT_KEY} ^
                        -Dsonar.sources=src ^
                        -Dsonar.host.url=${SONAR_HOST_URL} ^
                        -Dsonar.login=${SONAR_TOKEN} ^
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
