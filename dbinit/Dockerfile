FROM mcr.microsoft.com/mssql/server

# Create app directory
WORKDIR /usr/src/app

# Copy initialization scripts
COPY . /usr/src/app

# Switch to root user for access to apt-get install
#USER root

# Grant permissions for the import-data script to be executable
RUN chmod +x /usr/src/app/import-data.sh
#RUN chmod +x /usr/src/app/import-data.sh

# Switch back to mssql user and run the entrypoint script
#USER mssql
CMD /bin/bash ./entrypoint.sh