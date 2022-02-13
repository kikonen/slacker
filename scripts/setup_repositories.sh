DIR=`dirname $0`
DIR=`realpath $DIR`
ROOT_DIR=`dirname $DIR`

PROJECTS_DIR="$ROOT_DIR/projects"

REPOSITORIES=`ls $PROJECTS_DIR`
echo "REPOSITORIES: $REPOSITORIES"

echo "$REPOSITORIES" | tr ' ' '\n' | while read REPO; do
    REPO_DIR="$PROJECTS_DIR/${REPO}"
    SERVICE_DIR="$ROOT_DIR/${REPO}-service"

    cp -a $SERVICE_DIR/* $REPO_DIR
    cp -a $SERVICE_DIR/.dockerignore $REPO_DIR
    cp -a $SERVICE_DIR/.yarnrc $REPO_DIR
done

ls -al $PROJECTS_DIR
