import React from 'react'
import { Card, CardHeader, Row, Table } from 'reactstrap'

export const List = ({ data, name }) => {
	return (
		<Row className="mt-5">
			<div className="col">
				<Card className="bg-default shadow">
					<CardHeader className="bg-transparent border-0">
						<h3 className="text-white mb-0"> Les {name}</h3>
					</CardHeader>
					<Table className="align-items-center table-dark table-flush" responsive>
						<thead className="thead-dark">
							<tr>
								{Object.keys(data[0]).map((a, i) => {
									return <th scope="col">{a}</th>
								})}
							</tr>
						</thead>
						<tbody>
							{Array.from(data).map((a, i) => {
								return (
									<tr>
										{Object.keys(a).map((b, c) => {
											return <td>{a[b]}</td>
										})}
									</tr>
								)
							})}
						</tbody>
					</Table>
				</Card>
			</div>
		</Row>
	)
}
