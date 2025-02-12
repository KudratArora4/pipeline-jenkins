pipeline {
    agent any

    environment {
        SONARQUBE = 'SonarQube'  // Name of the SonarQube server configuration in Jenkins
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
                    withSonarQubeEnv('Sonarqube') {
                        bat 'sonar-scanner'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build and Tests completed successfully!'
        }
        failure {
            echo 'Build or Tests failed.'
        }
    }
}
