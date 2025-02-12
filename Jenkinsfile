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
                    // Run SonarQube analysis using the SonarQube environment set up in Jenkins
                    withSonarQubeEnv('Sonarqube') {
                        // This uses the Jenkins SonarQube plugin to run analysis
                        bat 'npm run sonar'  // If you set up a script in package.json for sonar-scanner
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
