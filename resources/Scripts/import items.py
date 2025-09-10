import csv,json

csv_file = "items.csv"
json_file = "itemspotent.json"

items = []
with open(csv_file, newline='',encoding='utf-8') as f:
          reader = csv.DictReader(f)
          for row in reader:
              items.append({
                "id": row["id"].strip(),
                "name": row["name"].strip(),
                "dono": row["dono"].strip(),
                "desc": row["desc"].strip(),
                "startingBid": float(row["startingBid"]),
                "retailValue": float(row["retailValue"]),
                "img": row["img"].strip()
                })
              
with open(json_file, "w", encoding="utf-8") as f:
    json.dump(items, f, indent=2)

print(f"✅ Converted {len(items)} items into {json_file}")