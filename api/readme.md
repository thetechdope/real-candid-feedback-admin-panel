### Install dependencies

```
# Backend deps
npm install

# Frontend deps
cd client
npm install
```

### Run Server

```
npm run server
```

### Important Commands

rsync -e "ssh -i ~/demo.pem" -av --exclude={'client','node_modules'} ./ ubuntu@34.212.54.70:/home/ubuntu/code/real-candid-feedback-admin-panel

sudo kill -9 `sudo lsof -t -i:3000`
