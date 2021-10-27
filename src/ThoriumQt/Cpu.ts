import { Engine } from './Engine';

/**
* @Title ComponentsLib.Button
* @Desc Boutton par défaut
* @Tag QLabel
*/
export namespace Cpu{

  interface cpusTime{
    user:number
    nice:number
    sys:number
    idle:number
    irq:number
  }

  interface cpus{
    model:string;
    speed:number
    times:cpusTime
  }

  interface ProcessStats{
    FrameRate :number,
    startTime :number,
    elapsedTime :number
    intervalTime:number
    fps:number
  }

  interface osStats{

    fps:number;

  }

  export class Process{

    test:Engine|null = null;

    #engine:Engine|null = null;
    #os:any = require('os');
    #FrameRate:number = 43;
    #startTime:number = 0;
    #intervalTime:number = 0;
    #lastTime:number = 0;
    #elapsedTime:number = 0;
    #EngineInterval:number = setInterval(this.#UpdateStats,0,this.#engine,this);
    #fps:number = 0;

    get Stats():ProcessStats{
      return {
        FrameRate : this.#FrameRate,
        startTime : this.#startTime,
        elapsedTime : this.#elapsedTime,
        intervalTime : this.#intervalTime,
        fps : this.#fps
      }
    }

    get EOL():string{return this.#os.EOL}
    get Arch():string{return this.#os.arch()}
    get Constants():object{return this.#os.constants}
    get Cpus():cpus[]{return this.#os.cpus()}
    get DevNull():string{return this.#os.devNull}
    get Endianness():string{return this.#os.endianness()}
    get Freemem():number{return this.#os.freemem()}
    GetPriority(pid:number[]):number{return this.#os.getPriority(pid)}
    get Homedir():string{return this.#os.homedir()}
    get Hostname():string{return this.#os.hostname()}
    get Loadavg():number[]{return this.#os.loadavg()}
    get NetworkInterfaces():object{return this.#os.networkInterfaces()}
    get Platform(){return this.#os.platform()}
    get Release():string{return this.#os.release()}
    SetPriority(pid:number[],priority:number):void{this.#os.setPriority(pid,priority)}
    get Tmpdir():string{return this.#os.tmpdir()}
    get Totalmem():number{return this.#os.totalmem()}
    get Type():string{return this.#os.type()}
    get Uptime():number{return this.#os.uptime()}
    UserInfo(option?:{encoding:string}):object{return this.#os.userInfo(option)}
    get Version():string{return this.#os.version()}

    constructor(engine:Engine){

      this.#engine = engine;
      this.#Start();

    }

    async #UpdateStats(engine:Engine,self:Process){

      if(self.#startTime == 0)self.#startTime = Date.now();
      else {
        self.#elapsedTime = Date.now() - self.#startTime;
        self.#intervalTime = self.#elapsedTime / (self.#elapsedTime / self.#FrameRate);
        self.#lastTime = Date.now();
        self.#fps = 1000/self.#intervalTime;
      }

      engine?.FrameUpdate(self);

    }

    #Start(){this.#EngineInterval = setInterval(this.#UpdateStats,this.#FrameRate,this.#engine,this);}

    #Stop(){clearInterval(this.#EngineInterval);}

    Restart(newInterval:number){
      if(newInterval <= 43)this.#FrameRate = newInterval;
      this.#Stop();
      this.#Start();
    }

  }

}
