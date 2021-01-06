FROM nginx

# EXPOSE 8080

RUN rm /usr/share/nginx/html/*

COPY configs/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

# FROM nginx

# # RUN apk add --no-cache bash
# COPY wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh

# CMD ["nginx", "-g", "daemon off;"]
