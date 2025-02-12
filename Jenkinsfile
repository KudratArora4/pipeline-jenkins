pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                bat 'npm install' // Use bat instead of sh for Windows
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test' // Use bat instead of sh for Windows
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the app...'
                // Add your deployment command here
            }
        }
    }
}
