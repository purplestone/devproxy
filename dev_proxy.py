#!/usr/bin/python
#coding=utf-8

__doc__ = """
proxy for local debug develop

!! not support https treaty !!

author gaoyuan.ggg@gmail.com

power by Tiny HTTP Proxy.

This module implements GET, HEAD, POST, PUT and DELETE methods
on BaseHTTPServer, and behaves as an HTTP proxy.  The CONNECT
method is also implemented experimentally, but has not been
tested yet.

Any help will be greatly appreciated.		SUZUKI Hisao

2009/11/23 - Modified by Mitko Haralanov
			 * Added very simple FTP file retrieval
			 * Added custom logging methods
			 * Added code to make this a standalone application
"""

__version__ = "0.3.1"

import BaseHTTPServer, select, socket, SocketServer, urlparse
import logging
import logging.handlers
import getopt
import sys
import os
import signal
import threading
from types import FrameType, CodeType
from time import sleep
import ftplib
import re
import gpy
try:
	import simplejson as json
except ImportError:
	import json
import pdb

DEFAULT_LOG_FILENAME = "proxy.log"


class ProxyHandler (BaseHTTPServer.BaseHTTPRequestHandler):
	__base = BaseHTTPServer.BaseHTTPRequestHandler
	__base_handle = __base.handle

	server_version = "TinyHTTPProxy - devproxy/" + __version__
	rbufsize = 0						# self.rfile Be unbuffered

	def handle(self):
		(ip, port) =  self.client_address
		#self.server.logger.log (logging.INFO, "Request from '%s'", ip)
		if hasattr(self, 'allowed_clients') and ip not in self.allowed_clients:
			self.raw_requestline = self.rfile.readline()
			if self.parse_request(): self.send_error(403)
		else:
			self.__base_handle()

	def _connect_to(self, netloc, soc):
		print('===== _connect_to =====')
		i = netloc.find(':')
		if i >= 0:
			host_port = netloc[:i], int(netloc[i+1:])
		else:
			host_port = netloc, 80
		#self.server.logger.log (logging.INFO, "connect to %s:%d", host_port[0], host_port[1])
		try:
			soc.connect(host_port)
			#print('===== soc.connect(host_port) =====')
		except socket.error, arg:
			try: msg = arg[1]
			except: msg = arg
			self.send_error(404, msg)
			return 0
		return 1

	def do_CONNECT(self):
		print('===== do_CONNECT =====')
		warp_path = warp_url('https://'+self.path)
		gpy.var_dump(warp_path)
		soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		gpy.var_dump((socket.AF_INET, socket.SOCK_STREAM))
		gpy.var_dump((self.path, soc))
		gpy.var_dump((warp_path.urn, soc))
		if warp_path.urn != self.path:
			print 
			printLog(self.server.logger, '-----------------------------------------')
			#print(self.path)
			printLog(self.server.logger, self.path)
			print('----------')
			#print(warp_path)
			printLog(self.server.logger, warp_path.urn)
			print('-----------------------------------------')
			print 
		try:
			if self._connect_to(warp_path.urn, soc):
				self.log_request(200)
				self.wfile.write(self.protocol_version +
								 " 200 Connection established\r\n")
				self.wfile.write("Proxy-agent: %s\r\n" % self.version_string())
				self.wfile.write("\r\n")
				self._read_write(soc, 300)
		finally:
			soc.close()
			self.connection.close()

	def do_GET(self):
		#print('===== do_GET =====')
		global sIniPath
		#self.log_request()
		(scm, netloc, path, params, query, fragment) = urlparse.urlparse(self.path.__str__(), 'http')
		if path == '/aj/reloadIni':
			print 
			print 
			proxy_ini = getIni(self.server.logger)
			#gpy.var_dump(proxy_ini)
			try:
				soc.close()
				self.connection.close()
			finally:
				return False

		warp_path = warp_url(self.path)
		#gpy.var_dump(warp_path)
		#warp_path.str = 'E:\ggg_toy\install_rar\devproxy.ini'
		#pdb.set_trace()
		if warp_path.__str__() != self.path:
			print 
			printLog(self.server.logger, '-----------------------------------------')
			#print(self.path)
			printLog(self.server.logger, self.path)
			print('-----'+(('  '+ warp_path.host +'  ') if warp_path.host else '') +'-----')
			#print(warp_path)
			printLog(self.server.logger, warp_path)
			print('-----------------------------------------')
			print 

		if warp_path.isLocalFile:
			try:
				oF = open(warp_path.urn)
				sHttpBody = oF.read()
				#print(sHttpBody)
				oF.close()
				self.send_response(200)
				self.send_header('Content-type', 'text/html')
				self.end_headers()
				self.wfile.write(sHttpBody)
			except :
				sHttpBody = 'devpoxy error( Not Found File: ' + warp_path.urn +' )'
				self.send_error(404, sHttpBody)


		else:
			#gpy.var_dump(proxy_ini)
			#print(warp_path.host)
			(scm, netloc, path, params, query, fragment) = urlparse.urlparse(warp_path.__str__(), 'http')
			if path == '':
				path = '/'
			#gpy.var_dump((scm, netloc, path, params, query, fragment))
			if scm not in ('http', 'ftp') or fragment or not netloc:
				self.send_error(400, "bad url %s" % self.path)
				return
			soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
			#self.headers.headers[0] = 'Host: ggggggg.com\r\n'
			#gpy.var_dump((socket.AF_INET, socket.SOCK_STREAM))
			try:
				if scm == 'http':
					if self._connect_to(netloc, soc):
						self.log_request()
						soc.send("%s %s %s\r\n" % (self.command,
												   urlparse.urlunparse(('', '', path,params, query,'')),
												   self.request_version))
						#gpy.var_dump(self.headers)
						#soc.send("aaaaa: aaaaa\r\n")
						soc.send("devproxy-ini: "+sIniPath+"\r\n")
						self.headers['Connection'] = 'close'
						del self.headers['Proxy-Connection']
						for key_val in self.headers.items():
							if key_val[0] == 'host':
								header_unit = "%s: %s\r\n" % ('host', warp_path.host)
							else:
								header_unit = "%s: %s\r\n" % key_val
							#header_unit = "%s: %s\r\n" % key_val
							#print(header_unit)
							soc.send(header_unit)
							
						soc.send("\r\n")
						self._read_write(soc)
						#gpy.var_dump(soc)
				elif scm == 'ftp':
					# fish out user and password information
					i = netloc.find ('@')
					if i >= 0:
						login_info, netloc = netloc[:i], netloc[i+1:]
						try: user, passwd = login_info.split (':', 1)
						except ValueError: user, passwd = "anonymous", None
					else: user, passwd ="anonymous", None
					self.log_request ()
					try:
						ftp = ftplib.FTP (netloc)
						ftp.login (user, passwd)
						if self.command == "GET":
							ftp.retrbinary ("RETR %s"%path, self.connection.send)
						ftp.quit ()
					except Exception, e:
						self.server.logger.log (logging.WARNING, "FTP Exception: %s",
												e)
			finally:
				soc.close()
				self.connection.close()

	def _read_write(self, soc, max_idling=20, local=False):
		#print('===== _read_write =====')
		iw = [self.connection, soc]
		local_data = ""
		ow = []
		count = 0
		while 1:
			count += 1
			(ins, _, exs) = select.select(iw, ow, iw, 1)
			if exs: break
			if ins:
				for i in ins:
					if i is soc: out = self.connection
					else: out = soc
					data = i.recv(8192)
					if data:
						if local: local_data += data
						else: out.send(data)
						count = 0
			if count == max_idling: break
		if local: return local_data
		return None

	do_HEAD = do_GET
	do_POST = do_GET
	do_PUT  = do_GET
	do_DELETE=do_GET

	def log_message (self, format, *args):
		pass
		#self.server.logger.log (logging.INFO, "%s %s", self.address_string (),
								#format % args)
		
	def log_error (self, format, *args):
		pass
		#self.server.logger.log (logging.ERROR, "%s %s", self.address_string (),
								#format % args)

class ThreadingHTTPServer (SocketServer.ThreadingMixIn,
						   BaseHTTPServer.HTTPServer):
	def __init__ (self, server_address, RequestHandlerClass, logger=None):
		BaseHTTPServer.HTTPServer.__init__ (self, server_address,
											RequestHandlerClass)
		self.logger = logger





def logSetup (filename, log_size, daemon):
	logger = logging.getLogger (' ')#"dev_proxy power by TinyHTTPProxy"
	logger.setLevel (logging.INFO)
	if filename:
		handler = logging.handlers.RotatingFileHandler (filename,
														maxBytes=(log_size*(1<<20)),
														backupCount=5)
		fmt = logging.Formatter ("[%(asctime)-12s.%(msecs)03d] "
							 "%(levelname)-8s {%(name)s %(threadName)s}"
							 " %(message)s",
							 "%Y-%m-%d %H:%M:%S")

		handler.setFormatter (fmt)
			
		logger.addHandler (handler)
	return logger

def usage (msg=None):
	if msg: print msg
	print sys.argv[0], "[-p port] [-l logfile] [-dh] [-j jsonfile] [allowed_client_name ...]]"
	print
	print "   -p	   - Port to bind to"
	print "   -i	   - Set .ini file path"
	print "   -l	   - Path to logfile. If not specified, STDOUT is used"
	print "   -d	   - Run in the background"
	print "   -j	   - format json text"
	print

def handler (signo, frame):
	while frame and isinstance (frame, FrameType):
		if frame.f_code and isinstance (frame.f_code, CodeType):
			if "run_event" in frame.f_code.co_varnames:
				frame.f_locals["run_event"].set ()
				return
		frame = frame.f_back
	
def daemonize (logger):
	class DevNull (object):
		def __init__ (self): self.fd = os.open ("/dev/null", os.O_WRONLY)
		def write (self, *args, **kwargs): return 0
		def read (self, *args, **kwargs): return 0
		def fileno (self): return self.fd
		def close (self): os.close (self.fd)
	class ErrorLog:
		def __init__ (self, obj): self.obj = obj
		def write (self, string): self.obj.log (logging.ERROR, string)
		def read (self, *args, **kwargs): return 0
		def close (self): pass
		
	if os.fork () != 0:
		## allow the child pid to instanciate the server
		## class
		sleep (1)
		sys.exit (0)
	os.setsid ()
	fd = os.open ('/dev/null', os.O_RDONLY)
	if fd != 0:
		os.dup2 (fd, 0)
		os.close (fd)
	null = DevNull ()
	log = ErrorLog (logger)
	sys.stdout = null
	sys.stderr = log
	sys.stdin = null
	fd = os.open ('/dev/null', os.O_WRONLY)
	#if fd != 1: os.dup2 (fd, 1)
	os.dup2 (sys.stdout.fileno (), 1)
	if fd != 2: os.dup2 (fd, 2)
	if fd not in (1, 2): os.close (fd)
	
def main ():
	global proxy_ini, sIniPath, bOldVerIni, bLog

	logfile = None
	daemon  = False
	max_log_size = 20
	port = 8000
	allowed = []
	run_event = threading.Event ()
	local_hostname = socket.gethostname ()

	try: opts, args = getopt.getopt (sys.argv[1:], "l:dhp:i:j:os", [])
	except getopt.GetoptError, e:
		usage (str (e))
		return 1

	gpy.var_dump(sys.argv)

	#gpy.var_dump(opts)

	sExIniPath = ''
	bOldVerIni = False
	bLog = False
	#gpy.var_dump(opts);
	for opt, value in opts:
		if opt == "-p": port = int (value)
		if opt == "-l":
			logfile = value
			bLog = True
		if opt == "-i": sExIniPath = value
		if opt == "-d": daemon = not daemon
		if opt == "-h":
			usage ()
			return 0
		if opt == "-j":
			formatJson(value)
			return 0
		if opt == '-o':bOldVerIni = True
		if opt == "-s":
			setup()
			return 0


	#sCDir = os.path.dirname(__file__)
	#sCDir = os.path.abspath('.')
	if sExIniPath:
		sIniPath = sExIniPath
	else:
		sCDir = os.getcwd()
		if sCDir:
			sCDir = sCDir + '/'
		sIniPath = sCDir + 'url_warp.ini'
	#sIniPath = './url_warp.ini'
	#print(sIniPath)

	#set ini
	#print(sIniPath)
	#print(proxy_ini)
	#gpy.var_dump(proxy_ini)


	# setup the log file
	logger = logSetup (logfile, max_log_size, daemon)

	proxy_ini = getIni(logger);
	if daemon:
		daemonize (logger)
	signal.signal (signal.SIGINT, handler)

	if args:
		allowed = []
		for name in args:
			client = socket.gethostbyname(name)
			allowed.append(client)
			printLog(logger, "Accept: %s (%s)" % (client, name))
			#logger.log (logging.INFO, "Accept: %s (%s)" % (client, name))
		ProxyHandler.allowed_clients = allowed
	else:
		printLog(logger, "<gaoyuan.ggg@gmail.com> Any clients will be served...")
		#logger.log (logging.INFO, "<gaoyuan.ggg@gmail.com> Any clients will be served...")

	server_address = ('', port)
	#server_address = (socket.gethostbyname (local_hostname), port)
	ProxyHandler.protocol = "HTTP/1.0"
	httpd = ThreadingHTTPServer (server_address, ProxyHandler, logger)
	sa = httpd.socket.getsockname ()
	print "Servering HTTP on", sa[0], "port", sa[1]
	req_count = 0
	while not run_event.isSet ():
		try:
			httpd.handle_request ()
			req_count += 1
			if req_count == 1000:
				logger.log (logging.INFO, "Number of active threads: %s",
							threading.activeCount ())
				req_count = 0
		except select.error, e:
			if e[0] == 4 and run_event.isSet (): pass
			else:
				logger.log (logging.CRITICAL, "Errno: %d - %s", e[0], e[1])
	logger.log (logging.INFO, "Server shutdown")
	return 0


def formatJson(sFilePath):
	oF = open(sFilePath)
	s = oF.read()
	oF.close()

	sJ = json.dumps(json.loads(s), indent=4)

	oF = open(sFilePath, 'w')
	oF.write(sJ)
	oF.close()



class Url():
	def __init__(self, s):
		self.urn = s[s.find('://')+3:]
		self.isLocalFile = False
		self.protocol  = s[0:s.find('://')+3]
		if not self.protocol:
			self.protocol = 'http://'
		rSearchHost = re.search(r'://([A-z0-9-_\.:@]+)', s)
		if rSearchHost:
			self.host = rSearchHost.group(1)
		else:
			self.host = ''

	def __str__(self):
		return self.protocol + self.urn


def warp_url(sUrl):
	#print('warp_url proxy_ini')urn
	oUrl = Url(sUrl)
	sUrl = oUrl.urn

	print('def warp_url')
	for tUrl in proxy_ini:
		#if tUrl[0][0:1] == '^':
			#sReSrcUrl = '^http://' + tUrl[0][1:]
		#else:
			#sReSrcUrl = 'http://' + tUrl[0]
		#pdb.set_trace()
		if tUrl[3]:
			if not re.compile('^.+:\d').match(tUrl[0]):
				tUrl[0] = tUrl[0] + ':443'
		rUrl = re.compile(tUrl[0] + '$')
		#pdb.set_trace()
		gpy.var_dump((tUrl[0], sUrl))
		gpy.var_dump(rUrl.match(sUrl))

		if rUrl.match(sUrl):
			oUrl.isLocalFile = tUrl[2]
			oUrl.isHttps = tUrl[3]
			oUrl.host = tUrl[4]
			if tUrl[2]:
				sCDir = os.getcwd()
				#print(sCDir)
				sUrl = sCDir + '/devproxy_temp_file' + tUrl[1]
				oUrl.protocol = 'file://'
				if sUrl.find('\\') > -1:
					sUrl = sUrl.replace('/', '\\')
			else:
				sReUrl = tUrl[1].replace('$', '\\')
				#pdb.set_trace()
				print('rUrl.sub')
				gpy.var_dump(rUrl.pattern)
				gpy.var_dump((sReUrl,sUrl))
				sUrl = rUrl.sub(sReUrl,sUrl)
			oUrl.urn = sUrl
			break
	#return sUrl
	#print('%%%%%')
	#gpy.var_dump(proxy_ini)
	#print('%%%%%')
	if not oUrl:
		oUrl = Url(sUrl)
	#pdb.set_trace()
	#print(sUrl)
	return oUrl

def printLog(obj, str):
	print(str)
	if bLog:
		obj.log(logging.INFO, str)



def getIni(logger):
	global proxy_ini, sIniPath, bOldVerIni
	#print('++++++++++++++++++++++++++++++++++++++++++')
	printLog(logger, '++++++++++++++++++++++++++++++++++++++++++')
	print
	#print(sIniPath)
	printLog(logger, sExIniPath + sIniPath)
	print
	#print(proxy_ini)
	oIniFile = open(sIniPath)
	if bOldVerIni:
		sIni = oIniFile.read()
		allRule = eval('['+sIni+']')
	else:
		sIni = oIniFile.read()
		proxy_ini = json.loads(sIni)
		exRuleList = filter(lambda u: u[3], proxy_ini['ex']['table'])
		exRuleList = [[u[1], u[2], u[4], u[5], u[6]] for u in exRuleList]

		currentIniAbleList = filter(lambda u:proxy_ini['currentIni'][u]['able'], proxy_ini['currentIni'])
		currentSettingTableList = [proxy_ini['condition'][proxy_ini['currentIni'][u]['context']]['setting'][u]['table'] for u in currentIniAbleList]
		currentSettingRuleList = []
		for table in currentSettingTableList:
			currentSettingRuleList += table
		currentSettingRuleList = filter(lambda u:u[3], currentSettingRuleList)
		#gpy.var_dump(currentSettingRuleList)
		currentSettingRuleList = [[u[1], u[2], u[4], u[5], u[6]] for u in currentSettingRuleList]

		allRule= exRuleList + currentSettingRuleList
	

	oIniFile.close()
	for u in allRule:
		if u[2]:
			sDir = os.getcwd() + '/devproxy_temp_file' + u[1]
		else:
			sDir = ''
		#print(u[0] + '			   ' + u[1])
		printLog(logger, u[0] + '			   ' + sDir + u[1])
		print

	print
	#print('++++++++++++++++++++++++++++++++++++++++++')
	printLog(logger, '++++++++++++++++++++++++++++++++++++++++++')
	print
	proxy_ini = allRule

	#gpy.var_dump(proxy_ini)
	return allRule

def setup():
	sCDir = gpy.cur_file_dir()
	sCDir = sCDir.replace('/dev_proxy', '', 1)
	sCDir = sCDir.replace('\\dev_proxy', '', 1)
	sBatFileName = 'dev_proxy.bat'
	sReadmeFileName = 'readme.txt'
	parseTemplate(sBatFileName, sCDir)
	print(parseTemplate(sReadmeFileName, sCDir).decode('utf-8'))#.encode('gb2312')
	


def parseTemplate(sFileName, sDir):
	sPath = sDir + '/setup/' + sFileName
	oFile=open(sPath) 
	#print(sPath)
	#print(sDir)
	sTargetPath = sDir + '/' + sFileName
	#print(sTargetPath)
	sTpl = oFile.read()
	oFile.close()
	sTpl = sTpl.replace('{$$$dir$$$}', sDir)
	#print(sTpl)
	oFile=open(sTargetPath, 'w') 
	oFile.write(sTpl)
	oFile.close()
	return sTpl






proxy_ini = {}
sIniPath = ''
sExIniPath = ''


if __name__ == '__main__':
	sys.exit (main ())
