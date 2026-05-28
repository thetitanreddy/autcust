import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
  type: "service_account",
  project_id: "autcust-001",
  private_key_id: "2c5e22e9d3363f1b439f518d6b09c261baffd7f4",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkgXR/xV6NRmFA\nEr5S9fjUYoAmLdZ0n8VUNMPTRMV788vb7Gw7Dtt5J9Kd0Wmnw9/EZH8awIi3HcXc\n8tXKWBsxx7mQEUKuNRo4NQEcBzWX0pSIL1DrBMu9C3REc4YyIiXiN/VhQ9L0Tjj4\nBOFw50pUhHqrJxK/bZgm8FwT02BZ7w++kwzYBbdZNqzx8gI/cPVAUIoRsegddKJw\nd/ZcWLdoABKblRXMzv9L+hyZQIzVSYnKIPKduoTwo6VW1QR0b8dGR8cIZQtzZjzn\n4hDm04QSQj6tahkVROqtzipQcPlkYL54QZgCVq9KRvqPHJE9uy/+ZSsHtglcF6Cp\na7J2j0h7AgMBAAECggEAOmPw1AFcZEzc6/87Kvs/zTMBRYvzmQW05wSrlWvNpQeO\nDovGhtfpMwHdkkLoe7Hc1TrOmtJINKcOujQ/ikjnri20Qdy+jFMw8U5vDGHKtg76\nxbP1xtW2820DYeCXe2f/hmJSaKnIUQsK0Y357zdJfOJhICsIToY6AWhDZo4anxDY\nEAEDZuIfZHLd8ApdI88Jj2oUO2hvPB79Qe2ipd8mQO46OdLea89ZW3ob285Lq617\nicOqu5fQclb6Oxp97SyaI93TcUo/bZp31wIDhaO6UtxfuUWYQLp2GzoqAv0l53Tj\nKitnwaIGJMtgsx1U0aCFXh0B19Lue7LbORIS/RopEQKBgQDRyquhnrhQA8UM7NjH\n1bFDCcl2k0jtg/QxcJDHaIb2eE5xtHAj0tyRwHTLSKFq0BxFV4dTPN/Ze2tOLF9Y\nn+6YPFtXt/gIQkYP4VexGkC0bt6QlK3GHx+h+Pz7v6gcU17Vdl1n2I74jM2Jq6Gc\nHz+kfvIB/5XuRxZlQF43mBQtfwKBgQDIvUjzzETy3y40KQQKmurjEg+QoIpceP2C\niBeOLHnHGSfas3PTrtQx9FbGA38R4xepe4XfvoBW9ZFMmZ/8QkNuSm+I6/Py4k75\nv2fEuC2nIhJ0yT4UQESYYu+35WxBzNr3p44yAClPLGOGQUmGAFYBtRWeHddFVafn\nnljR7aIbBQKBgAQalNTqh+x4xmgEUhFGqtsG2/wH0Ytj42j8LLjZ4Jn9rHso7nCk\n9U+clixL1WyDeaoZljoYnMBiW60BzTOsnTw5IghLPvzaXwh8ffym6NEewhfN8MBJ\nZ5MBjeFW1HEJaHeAgz8+yz0tc+/XfafSLKqJGS7U0xgAJ/3/DljEDtD9AoGAUG2W\nlyfW0ECfcIKmfeFIDyajWd0Y0qgfWndQiMRFHoJzt2qDE+NOXZ16TugDt5T3XA6D\nuvvGzBCj4L8EnLun7L6iJYf0O/J0lhgcaXMpx3cdUfF3kAGX+j5ZsaKYV1zOtr9J\nd7sc0f4E+juaS7hCvXhiavGl2L/TADgvehzuAEkCgYEAq+Zhlp0ZypnLMiiWr24P\nqGvMGR3maA7fisQW3YpcAOGuEfOp6fIPh1pXjjhV3DuJskpUgaHQVscatXXsEWFt\nw2vTxykLR2EdlarvxUEJsz6iZ6w2KlcTPgTsEH8Th4OhyVUqrxvp9CQjDfy69X5F\nKdYIUguT0iZHx0TEwy3gLZk=\n-----END PRIVATE KEY-----\n"?.replace(/\\n/g, "\n"),
  client_email: "firebase-adminsdk-fbsvc@autcust-001.iam.gserviceaccount.com",
  client_id: "105112983104663358711",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40autcust-001.iam.gserviceaccount.com"
};
const activeApps = getApps();
if (!activeApps.length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}
const db = getFirestore();

export { db as d };
