# Create a file .env with the following

## Config for 1st localhost

PORT=3000
REACT_APP_API_PORT=8080
REACT_APP_API_PORT_P2P = 5001

## Config for 2nd localhost

PORT=4000
REACT_APP_API_PORT=5001
REACT_APP_API_PORT_P2P = 8080

Create 2 terminals

In the terminal 1
Comment the 2nd config in .env
Run the following command line:

### `npm start`

In the terminal 2
Comment the 1nd config in .env
Run the following command line:

### `npm start`
