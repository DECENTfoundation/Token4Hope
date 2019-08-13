# Token4Hope

This is a public release of the software used for the Token4Hope project. Since the project has come to a successful conclusion, we’ve decided to pass the official code on to the public — so that everyone can have a chance to benefit from it.

Token4Hope (T4H) was a humanitarian project focused on helping indigent families and individuals in Vienna, Austria. As part of the Humanity Token initiative (https://humanitytoken.net/), the project ran for six full months and helped efficiently distribute all acquired donations to around 50 households in need by using blockchain technology.

The purpose of this software is non-profit. Considering this fact, we have not refactored the code in any way. Nevertheless, feel free to contribute and help the idea of improving charity via blockchain evolve even further.

The software consists of three parts. See README.md in each of the directories for more info.
- web interface
./ht-web-interface/
- backend service
./ht-engine-service/
- blockchain synchronization service
./ht-blockchain-sync-service/

# Notes to project setup

In the initial public release, the code was stripped of access tokens and all testing keys. If you wish to use this software, you will need to replace these with your own assets. For production, you will have to set the keys via environment variables. Configure environment for your project in these files:
- ./ht-engine-service/docker-compose.staging.yml
- ./ht-engine-service/docker-compose.dev.yml
- ./ht-engine-service/docker-compose.production.yml
- ./ht-engine-service/docker-compose.test.yml
- ./ht-engine-service/scripts/ssh_bitbucket_key
- ./ht-engine-service/config/initialseed.js
- ./ht-engine-service/.env.example

You may also want to change the blockchain asset from T4H to your own. Run this command in the main dir to find all occurrences:
grep -R T4H .

# Copyright and License

Copyright (C) 2019 DECENT Group, a.s.  
  
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.  
  
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.  
  
You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

