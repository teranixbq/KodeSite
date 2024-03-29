---
title: Redis Basic Operations
seo_title: Redis Basic Operations
summary: Basic Operations Redis
description: A brief guide to setting up KaTeX.
slug: redis-basic-operations
author: Hanief Fathul Bahri Ahmad

draft: false
date: 2024-01-17T21:21:46-05:00
lastmod: 2024-01-17T21:21:46-05:00
expiryDate: 
publishDate: 

feature_image: 
feature_image_alt: 

categories:
  - Database
tags:
  - Redis
  - Database
series: 


toc: true
related: true
social_share: true
newsletter: true
disable_comments: false
---

## Start Redis

Running redis with default config
```
redis-server
```

Sebaiknya menggunakan configurasi tambahan untuk memulai redis server, lihat configurasinya [disini](https://github.com/redis/redis/blob/7.2/redis.conf). Sesuaikan versi configurasinya pada branchnya, salin semua configurasinya dan buat file dengan .conf lalu kita bisa menambahkan beberapa konfigurasi nantinya disana.

start redis dengan configurasi
```
redis-server <path redis.conf>
```
contoh : 
```
redis-server config/redis.conf
```

Tampilan

{{< figure src="view-start.png" alt="view start">}}

artinya database redis sudah bisa digunakan. untuk memulai koneksi di lokal buat tab terminal baru untuk melakukan koneksi ke redis.

## Connect Redis

```
redis-cli -h localhost
```
tambahkan `-p <port>` jika port berbeda.

Penamaan database di redis menggunakan angka mulai dari 0, kita bisa mengatur berapa banyak database pada config sebelumnya tambahkan `databases <jumlah database>` di confignya.

contoh :

`databases 20`, yang artinya jumlah seluruh databasenya ada 20.

Gunakan `select <database index>` untuk berpindah dari database satu ke lainnya. Secara default saat connect yang tampil adalah database index 0.

lihat :

{{< figure src="selectdb.png" alt="select db">}}


## Operasi String

- `set <key> "<value>"`, untuk menetapkan nilai untuk suatu key tertentu.<br/>
Contoh : `set name "Daniel"`

- `get <key>`, mendapatkan value dari key.<br/>
Contoh : `get name`

- `exists <key>`, untuk mengecek apakah key memiliki value.<br/>
Contoh : `exists name`

- `del <key> [key ...]`, menghapus key dari database juga bisa menghapus banyak key secara bersamaan.<br/>
Contoh : `del name` atau `del name1 name2 name3`

- `append <key> "<value>"`, menambahkan value ke key yang sudah ada.<br/>
Contoh : `append name " Jon"`

- `keys <pattern>`, menampilkan semua key yang ada di database, bisa menggunakan wildcard `*` untuk menampilkan semua key.<br/>
Contoh : `keys *`

demo : 

<center><iframe src="https://github.com/teranixbq/NoteConf/assets/66883583/08fc5c7c-a5ab-4074-aad3-329104ff2bec" width="500" height="400"></iframe></center>

## Operasi String Range
- `setrange <key> <offset> "<value>"`, mengganti value dari key pada posisi tertentu.<br/>
Contoh : `setrange name 7 "Jon"`

- `getrange <key> <start> <end>`, mengambil value dari key pada posisi tertentu.<br/>
Contoh : `getrange name 0 8` <br/>

demo : 

{{< figure src="stringrange.gif">}}

## Operasi Multiple Key

- `mset <key> "<value>" [key ...]`, menetapkan value untuk beberapa key.<br/>
Contoh : `mset name "Daniel" age 20`

- `mget <key> [key ...]`, mendapatkan value dari beberapa key.<br/>
Contoh : `mget name age`

demo : 

{{< figure src="multiplekey.gif">}}

## Operasi Expiration

- `expire <key> <seconds>`, menetapkan waktu expired untuk key tertentu.<br/>
Contoh : `expire name 10`

- `setex <key> <seconds> "<value>"`, menetapkan waktu expired dan value untuk key tertentu.<br/>
Contoh : `setex name 10 "Daniel"`

- `ttl <key>`, menampilkan sisa waktu expired dari key.<br/>
Contoh : `ttl name`

- `persist <key>`, menghapus waktu expired dari key.<br/>
Contoh : `persist name`

demo :

{{< figure src="expiration.gif">}}

## Operasi Increment dan Decrement

- `incr <key>`, menambahkan value dari key dengan 1.<br/>
Contoh : `incr cart`

- `incrby <key> <increment>`, menambahkan value dari key dengan nilai tertentu.<br/>
Contoh : `incrby cart 5`

- `decr <key>`, mengurangi value dari key dengan 1.<br/>
Contoh : `decr cart`

- `decrby <key> <decrement>`, mengurangi value dari key dengan nilai tertentu.<br/>
Contoh : `decrby cart 5`

demo :

{{< figure src="incrdecr.gif">}}

## Operasi Flush

- `flushdb`, menghapus semua key dari database yang sedang aktif.<br/>

- `flushall`, menghapus semua key dari semua database.<br/>

## Bulk Pipeline

Bulk pipline digunakan ketika ingin melakukan beberapa operasi Redis sekaligus, kita dapat menggunakan cara ini untuk mengurangi latensi dan mempercepat eksekusi perintah.

```
redis-cli -h <host> -p <port> -n <index database> --pipe < <path file>
```
`<host>` : host redis yang digunakan<br/>
`<port>` : port redis yang digunakan<br/>
`<index database>` : index database yang digunakan<br/>
`<path file>` : path file yang berisi perintah redis yang akan dijalankan<br/>

contoh :

```
redis-cli -h localhost -p 6379 -n 0 --pipe < config/bulk.txt
```
Didalam bulk.txt terdapat perintah redis yang akan dijalankan secara berurutan. lihat contoh dibawah ini.

```
set name "Hanief FBA"
set age 17
set address "Jakarta"
set gender "Laki-laki"
```
result :

{{< figure src="bulk.png">}}

disana ada `replies : 4`, yang artinya ada 4 perintah didalam bulk.txt berhasil dijalankan.