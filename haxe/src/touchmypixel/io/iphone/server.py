#Author: Matt Benton (matt@mattbenton.net)

import SocketServer
import socket

UDP_PORT = 10552
TCP_PORT = 2727

class DataHandler(SocketServer.DatagramRequestHandler):
	def handle(self):
		global server
		newmsg = self.rfile.readline().rstrip()
		server.send(newmsg)
		self.wfile.write(self.server.oldmsg)
		self.server.oldmsg = newmsg
		
class DataServer:
	def __init__(self, udpPort, tcpPort):
		self.udpPort = udpPort
		self.tcpPort = tcpPort
		
		self.udp = None
		self.tcp = None
		self.client = None
	
	def startUdp(self):
		self.udp = SocketServer.UDPServer(('',self.udpPort), DataHandler)
		print "Awaiting UDP messages on port %d" % self.udpPort
		self.udp.oldmsg = "This is the starting message."
		self.udp.serve_forever()
		
	def startTcp(self):
		print "Waiting for game client..."
		self.tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		self.tcp.bind(('', self.tcpPort))
		# Listen for 1 client connection only
		self.tcp.listen(1)
		while True:
			channel, details = self.tcp.accept()
			print 'We have opened a connection with', details
			self.client = channel
			self.startUdp()
			break
			
	def send(self, s):
		try:
			self.client.send(s)
		except IOError as (errno, strerror):
			self.client.close()
			self.tcp.close()
			print "Client disconnected, shutting down UDP server"
			self.udp.shutdown()
			print "shutdown!"
			self.startTcp()
		except:
			print "Unexpected error:", sys.exc_info()[0]
			raise
		
#server = DataServer(10552, 2727)
server = DataServer(UDP_PORT, TCP_PORT)
server.startTcp();