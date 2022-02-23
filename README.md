## ActCept2
<<<<<<< HEAD

=======
>>>>>>> 166c6df8b92ff2b91704d61890b4e460f4b0a8db
```
git clone git@github.com:School-Of-Tech-Futures-UK/ActCept2.git
```

## Make a change:

```
git add .
git commit -m "Added a new file called my name"
git push
```

## Pull request in the morning:

```
git pull
```

## Install node modules

```
cd actcept
npm install
npm run build
```

## Start the app locally

```
cd actcept
npm start
```

## Deploy to AWS

```
cd actcept-cdk
npm install
aws-azure-login --profile aal-profile --mode debug
cdk deploy --profile aal-profile 
```