import argparse
import os
import subprocess
from multiprocessing import Pool, Process, Value, Manager
from termcolor import cprint
import time
import sys
import os

def main():

    parser = argparse.ArgumentParser()
    parser.add_argument("-t", "--test", const=str, nargs="?")
    args = parser.parse_args()
    redpath = str(args.test)
    bluepath = redpath

    

    clearScreen()
    cprint("Starting up", "red")
    stats = {
        "turn":"Preparing...",
        "bot": os.path.basename(os.path.normpath(redpath)),
        "seed":{

        }
    }
    checktime = time.time()
    if not os.path.exists("seed_logs"):
        os.makedirs("seed_logs")
    for seed in range(1,1001):
        stats["turn"] = "Preparing..."
        pretty_print(stats, seed)
        process = subprocess.Popen(["bc19run", "-b", bluepath, "-r", redpath, "-d", "false", "-s", str(seed)], stdout=subprocess.PIPE)
        verbose = []
        counter = 10
        for line in iter(process.stdout.readline, b''):
            data = line.decode(sys.stdout.encoding)
            verbose.append(data)
            if "Script Helper Turn" in data:
                currtime = time.time()
                if currtime - checktime > 2:
                    data = data.split("\n")[0]
                    data = data.split("@")
                    stats["turn"] = data[1]
                    pretty_print(stats, seed)
                    checktime = time.time()
            if counter < 10:
                counter -= 1
                if counter <= 0:
                    with open('seed_logs/seed_%s.txt' % seed, mode='wt', encoding='utf-8') as myfile:
                        myfile.write('\n'.join(verbose))
                    process.terminate()
                    break
            if "vm.js" in data:
                stats["seed"][seed] = "Failed"
                counter -= 1
            if "Game over, blue won " in data:
                if stats["seed"][seed] == "Time Failed":
                    stats["seed"][seed] = "Passed (Time Failed)"
                break
            if "Robot is frozen due to clock overdrawn by" in data:
                stats["seed"][seed] = "Time Failed"
            elif "Game over, red won " in data:
                if stats["seed"][seed] == "Time Failed":
                    stats["seed"][seed] = "Passed (Time Failed)"
                break
    pretty_print(stats, 1000, done=True)

    
def pretty_print(stats, seed, done=False):
    clearScreen()
    cprint("******************************", "magenta")
    if done == False:
        cprint("Running Seed Testing!", "red", attrs=['bold'])
    else:
        cprint("Seed Testing Finished!", "red", attrs=['bold'])
    cprint("Bot: %s" % stats["bot"], "green")
    cprint("Seed: %s / %s" % (seed, 1000), "white")
    cprint("Turn Status:")
    turn = stats["turn"]
    if turn != "Preparing...":
        cprint("\t Turn\t: %s / 999" % (turn), "white")
    else:
        cprint("\t Turn\t: %s" % (turn))
    cprint("Seed Status:", "cyan")
    for itm in stats["seed"].keys():
        status = stats["seed"][itm]
        color = "red"
        if "Passed" in status:
            color = "blue"
        if "Time Failed" in status:
            color = "yellow"
        cprint("\t Seed %s\t: %s" % (itm, stats["seed"][itm]), color)
    cprint("******************************", "magenta")

def clearScreen():
    os.system('cls' if os.name == 'nt' else 'clear')
    

if __name__ == "__main__":
    main()