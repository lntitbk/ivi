// import express, {Application} from "express";
// import socketIO = require('socket.io');
// import { Server as SocketIOServer } from "socket.io";
// import { createServer, Server as HTTPServer } from "http";
import {IHandleSocket} from './IHandleSocket';

export class Server implements IHandleSocket{
    
    constructor() {
        this.initialize();
    }
    private initialize() : void {
        console.log('init');
    }
    public run() : void {
        console.log('xin chao Server');
    }
}