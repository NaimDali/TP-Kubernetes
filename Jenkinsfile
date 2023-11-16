pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "naimsss/naimous:v1"
        GITHUB_REPOSIRORY = "https://github.com/NaimDali/TP-Kubernetes.git"
    }

    stages {
        stage('Pull from github') {
            steps {
               checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: env.GITHUB_REPOSIRORY]])
            }
        }

        stage ("Build docker image") {
            steps {
                script {
                    bat 'docker build -t %DOCKER_IMAGE% .'
                }
            }
        }
        
        stage ("Login to dockerhub") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        bat 'docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%'
                    }
                }
            }
        }

        stage ("Push image to dockerhub") {
            steps {
                script {
                    bat 'docker push %DOCKER_IMAGE%'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    bat 'kubectl apply -f deployment.yaml'
                    bat 'kubectl apply -f service.yaml'
                }
            }
        }

        stage('Run Nagios Checks') {
            steps {
                script {
                    bat "echo 'nagios check'"
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                script {
                    bat "echo 'Ansible'"
                }
            }
        }
    }
    
    post {
        always {
            bat 'docker logout'
        }
    }
}