# Temporary deployment scripts that will be replaced by a CI/CD pipeline
build-dev-docker:
	@echo "Building docker image..."
	@docker build -t webstradev/rsdb-dev-frontend:latest -f Dockerfile.dev .
	@echo "Pushing docker image..."
	@docker push webstradev/rsdb-dev-frontend:latest

deploy-dev:
	@echo "Deleting old k8s deployment"
	-@kubectl delete deployment rsdb-dev-frontend -n rsdb
	@echo "Deploying new k8s deployment"
	@kubectl apply -f kube/dev-deployment.yaml
	@echo "Done!"


dev: build-dev-docker deploy-dev
	@echo "Done!"