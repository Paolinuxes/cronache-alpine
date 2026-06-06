#!/usr/bin/env python3

import datetime

def main():
    now = datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
    print(f"Aggiornamento Cronache Alpine eseguito alle {now}")

if __name__ == "__main__":
    main()
