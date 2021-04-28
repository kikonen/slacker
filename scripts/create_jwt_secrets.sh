#
# https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9
#
SECRETS_DIR=.secrets

if [[ ! -d $SECRETS_DIR ]]; then
    mkdir $SECRETS_DIR
fi

cd $SECRETS_DIR
echo "NOTE: Don't add passphrase"
ssh-keygen -t rsa -b 4096 -m PEM -f jwt_key
# Don't add passphrase
openssl rsa -in jwt_key -pubout -outform PEM -out jwt_key.pub
cd ..

ls -al $SECRETS_DIR

cp -a $SECRETS_DIR api-service
cp -a $SECRETS_DIR auth-service
