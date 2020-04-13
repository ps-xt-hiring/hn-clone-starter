pipeline {
  agent any
  stages {
    stage('Git Checkout') {
      steps {
        git(url: 'https://github.com/diliGp/hn-clone.git', branch: 'master', credentialsId: 'github', poll: true)
      }
    }

  }
}