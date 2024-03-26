import json

class Commands:


    def __init__(self, player1, espConnections, coordConnections):
        self.player1 = player1
        self.espConnections = {}
        self.coordConnections = {}

    def ping(self, message, server):
        cmd, client = message.split()
        server.send_message(self.espConnections[client]["clientVal"], "ping")
    
    def pong(self, message, client, server):
        # Send message to server saying this client has responded
            if self.player1["player"] != None:
                server.send_message(self.player1["player"][0], json.dumps({"pong": client["id"]}))

    def setCoords(self, message):
        cmd, clientText, x, y = message.split()
        self.coordConnections[(int(x), int(y))] = {"client" : self.espConnections[clientText]["clientVal"], "color": '#000000'}
        self.espConnections[self.espConnections[clientText]]["coord"] = (int(x), int(y)) # might have to remove this
    
    def setColor(self, message):
        cmd, x, y, color = message.split()
        if (int(x), int(y)) not in self.coordConnections:
            print(f"ERROR: ({x}, {y}) does not have an ESP set yet!")
            return # TODO eventually send am essage back to user
        
        self.coordConnections[(int(x), int(y))]["coord"] = color
    
    def getClientState(self, client, server):
        # Creates data with from [{id1, x, y, color}, {id2, x, y, color}, ...]
        clientData = []
        for i in self.espConnections.keys():
            xVal = self.espConnections[i]["coord"][0]
            yVal = self.espConnections[i]["coord"][1]
            clientData.append({"clientName": i, "x": xVal, "y": yVal, "color": self.coordConnections.get((xVal, yVal), None)})

        clientData = {"data: ": clientData}

        clientText = json.dumps(clientData)
        server.send_message(client, clientText)
    
    def getLEDState(self, client, server):
        ledState = json.dumps({f"{coord[0]}-{coord[1]}": self.coordConnections[coord]["color"] for coord in self.coordConnections.keys()})
        server.send_message(client, ledState)
    
    def executeCommands(self, possibleCommands, message, client, server):
        if message == "":
            server.send_message(client, "invalid command")
            return

        if message.split(" ")[0] not in possibleCommands.keys():
            server.send_message(client, "invalid command")
            return

        # Command found!
        commandName = message.split(" ")[0]
        commandFunc = possibleCommands[commandName]["func"]
        commandArgs = possibleCommands[commandName]["args"]

        commandFunc(*commandArgs)
