import parseKMZ from "parse2-kmz"
import fs from "fs"

export default (req, res) => {
    const { filename } = req.file

    parseKMZ
        .toJson("./temp/" + filename)
        .then((r) => {
            const { features } = r
            let polygons = []
            let pointers = []
            let aux = []
            features.forEach((feature, i) => {
                if (feature.geometry.type === "Polygon") {
                    feature.geometry.coordinates[0].map((item) => {
                        aux.push({ lat: item[1], lng: item[0] })
                    })
                    polygons.push({
                        coords: aux,
                        name: feature.properties.name,
                    })
                    aux = []
                } else if (feature.geometry.type === "Point") {
                    pointers.push({
                        coords: {
                            lat: feature.geometry.coordinates[1],
                            lng: feature.geometry.coordinates[0],
                        },
                        name: feature.properties.name,
                    })
                }
            })
            fs.unlinkSync("./temp/" + filename)
            res.json({ polygons, center: polygons[0].coords[0], pointers })
        })
        .catch((e) => {
            console.error(e)
            res.send("no ok").end()
        })
}
