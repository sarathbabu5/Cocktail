pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Getting frontend source code from GitHub'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image'

                sh '''
                    docker build -t cocktail-app:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying frontend container'

                sh '''
                    docker rm -f cocktail-frontend || true

                    docker run -d \
                      --name cocktail-frontend \
                      -p 8080:80 \
                      cocktail-app:${BUILD_NUMBER}
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking frontend response'

                sh '''
                    sleep 3
                    curl -f http://localhost:8080/
                '''
            }
        }
    }

    post {
        success {
            echo 'Frontend deployment successful!'
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }
    }
}
