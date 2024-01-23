ARG CI
FROM $CI

COPY src/admin/ /node-app/

WORKDIR /node-app/

RUN npm set registry "https://npm.s256.dev" && \
    npm set //npm.s256.dev/:_authToken="/mQbVPu2/NRv5AF5GdUR4RD87gkH2PTgjZABLVo6LgE="

CMD nginx
