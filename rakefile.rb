task :deploy do
  
  sh "chmod +x deploy.sh"
  sh "deploy.sh"
end

  