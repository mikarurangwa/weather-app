Weather Forecast Application
Overview
The Weather Forecast Application allows users to search for and view real-time weather data for any city worldwide. This app fetches data from the OpenWeatherMap API and presents it in a user-friendly format, including details such as temperature, humidity, wind speed, and weather conditions.

The application is deployed on the following servers:

Web Server 1: 54.226.241.21
Web Server 2: 54.198.217.166
Load Balancer: 54.174.104.63
The deployed application is accessible at mikarurangwa.tech.

Features
Search for weather information by city name.
Real-time weather data fetched using the OpenWeatherMap API.
Clear and user-friendly data presentation.
Robust error handling for invalid inputs or API issues.
Fully deployed on multiple web servers with load balancing for high availability.
Technologies Used
Frontend
HTML
CSS
JavaScript
Backend
Node.js (Serve)
OpenWeatherMap API
Deployment
Nginx for reverse proxy.
HAProxy for load balancing.
Local Setup Instructions
Prerequisites
Node.js installed on your local machine.
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/mikarurangwa/weather-app.git
cd weather-app
Install dependencies:

bash
Copy code
npm install serve
Replace the placeholder API key in src/app.js with your OpenWeatherMap API key:

javascript
Copy code
const apiKey = "your_openweathermap_api_key";
Start the application locally:

bash
Copy code
npx serve public
Open the application in your browser:

arduino
Copy code
http://localhost:5000
Deployment Instructions
1. Accessing the Servers
SSH into each server using the provided IPs and credentials:

bash
Copy code
# Web Server 1
ssh ubuntu@54.226.241.21

# Web Server 2
ssh ubuntu@54.198.217.166

# Load Balancer
ssh ubuntu@54.174.104.63
2. Setting Up Web Servers (Web01 and Web02)
Install Necessary Packages
Run the following commands on both 6340-web-01 and 6340-web-02:

bash
Copy code
sudo apt update
sudo apt install -y nodejs npm nginx
Deploy the Application
Copy the project files to each server:

bash
Copy code
scp -r weather-app/ ubuntu@54.226.241.21:/var/www/weather-app
scp -r weather-app/ ubuntu@54.198.217.166:/var/www/weather-app
Start the application:

bash
Copy code
cd /var/www/weather-app
npx serve public
Configure Nginx
Edit the Nginx configuration file:

bash
Copy code
sudo nano /etc/nginx/sites-available/weather-app
Add the following configuration:

nginx
Copy code
server {
    listen 80;
    server_name 54.226.241.21;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
Enable the configuration:

bash
Copy code
sudo ln -s /etc/nginx/sites-available/weather-app /etc/nginx/sites-enabled/
sudo systemctl restart nginx
Repeat these steps for 6340-web-02 (54.198.217.166), updating server_name to the appropriate IP.

3. Configuring the Load Balancer (Lb01)
Install HAProxy
SSH into 6340-lb-01 and install HAProxy:

bash
Copy code
sudo apt update
sudo apt install -y haproxy
Configure HAProxy
Edit the HAProxy configuration file:

bash
Copy code
sudo nano /etc/haproxy/haproxy.cfg
Add the following configuration:

haproxy
Copy code
frontend http_front
    bind *:80
    default_backend http_back

backend http_back
    balance roundrobin
    server web01 54.226.241.21:80 check
    server web02 54.198.217.166:80 check
Restart HAProxy:

bash
Copy code
sudo systemctl restart haproxy
4. Update Domain Name
Point your domain mikarurangwa.tech to the IP address of your load balancer (54.174.104.63) using your domain registrar's DNS settings. Set an A record:

Host: @
Value: 54.174.104.63
Testing
Open your browser and navigate to mikarurangwa.tech.
Test the application by searching for weather data for different cities.
Refresh multiple times to ensure the load balancer distributes traffic between the two web servers.
Error Handling
Invalid City Name: Displays an alert to the user.
API Downtime: Displays an appropriate error message.
Empty Input: Alerts the user to provide a valid city name.
APIs Used
OpenWeatherMap API
Documentation: OpenWeatherMap API Docs
Future Enhancements
Add caching for API responses to improve performance.
Implement user authentication for personalized features.
Enhance data visualization with charts (e.g., using Chart.js or D3.js).
Credits
API: OpenWeatherMap
Deployment Tools: Nginx, HAProxy
Demo Video
Demo Video Link (Replace with your video link)

License
This project is licensed under the MIT License. See the LICENSE file for details.

Enjoy using the Weather Forecast Application at mikarurangwa.tech
