import csv
import datetime
import sys
import statistics
csv.field_size_limit(100000000)

CSV = "EYETRACKINGDATA.csv"
SAMPLE_TIME = 10
SCOPE = ["63","64","65","66","67","68","69","70","71","73","74","76","80","81","82","85","86","88","90","92","93","94","95","96"]
avg = []
rt1t = []
rt1r = []
rt2t = []
rt2r = []
with open(CSV, "r", encoding="utf-8") as f:
    next(f)
    csvr = csv.reader(f, delimiter=",")
    for c, row in enumerate(csvr):
        if row[0] in SCOPE:
            CID, ID, WIDTH, HEIGHT = row[0], row[1], row[7], row[8]
            if row[3]:
                print("RT1 Raw, RT2 Tool")
                e1, e2 = row[3], row[6]
                rt1r.append((len(e1) * SAMPLE_TIME) / 1000)
                rt2t.append((len(e2) * SAMPLE_TIME) / 1000)
            else:
                print("RT1 Tool, RT2 Raw")
                e1, e2 = row[4], row[5]
                rt1t.append((len(e1) * SAMPLE_TIME) / 1000)
                rt2r.append((len(e2) * SAMPLE_TIME) / 1000)

            t1 = (len(e1) * SAMPLE_TIME) / 1000
            t2 = (len(e2) * SAMPLE_TIME) / 1000
            avg.append(t1)
            avg.append(t2)
            t1 = str(datetime.timedelta(seconds = t1))
            t2 = str(datetime.timedelta(seconds = t2))
            
            print(t1, t2, ID)

print()
print(f"Participants in scope: {len(SCOPE)}")
print(f"Mean time taken to read an article: {datetime.timedelta(seconds = statistics.mean(avg))}")
print(f"Median time taken to read an article: {datetime.timedelta(seconds = statistics.median(avg))}")
print()

print("RT1 word count: 514")
print("RT2 word count: 375")
print()

print(f"Mean time taken to read RT1 Raw: {datetime.timedelta(seconds = statistics.mean(rt1r))}")
print(f"Median time taken to read RT1 Raw: {datetime.timedelta(seconds = statistics.median(rt1r))}")

print(f"Mean time taken to read RT2 Raw: {datetime.timedelta(seconds = statistics.mean(rt2r))}")
print(f"Median time taken to read RT2 Raw: {datetime.timedelta(seconds = statistics.median(rt2r))}")

print(f"Mean time taken to read RT1 Tool: {datetime.timedelta(seconds = statistics.mean(rt1t))}")
print(f"Median time taken to read RT1 Tool: {datetime.timedelta(seconds = statistics.median(rt1t))}")

print(f"Mean time taken to read RT2 Tool: {datetime.timedelta(seconds = statistics.mean(rt2t))}")
print(f"Median time taken to read RT2 Tool: {datetime.timedelta(seconds = statistics.median(rt2t))}")

