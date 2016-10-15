# SignalR Demo

This demo is composed of four main parts:

- Backend SignalR example running on ASP.NET 4.6.1
- Backend SignalR example implementation running on ASP.NET Core
- Client example running with Node.JS and React
 - Presentation slides

# Setup

## Database
Create two databases (one for each backend example) and change the connection strings in the projects

## SignalR on ASP.NET 4.6.1
- Open the NuGet Package Manager Console and run Update-Database
- Run the project
- Navigate to http://localhost:5000/api/Counters

## SignalR on ASP.NET Core
- Open your favorite shell and type __dotnet ef database update__
- __dotnet run__
- Navigate to http://localhost:5001/api/Counters

## Client
- Go to the Apps directory and run __npm install__
- Navigate to http://localhost:3333
- You can configure the API in use by changing the port in __constants.js__
- The client is written against the ASP.NET 4.6.1 example so some components might not work (You're more than welcome to fix it)

## The talk
- Images and sound are not included as there might be licensing issues (You can include your own)
- A recording of the session will be provided

__Thank you for attending, go ahead and give it a try!__
