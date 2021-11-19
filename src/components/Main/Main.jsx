import s from './Main.module.css';
import data from '../../json/data.json';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import useWindowDimensions from '../../Hooks/useWindowDimensions';

const Main = () => {

	const [state, setState] = useState(data.residentialComplex);
	const [selectResident, setSelectState] = useState(state[0]);
	const { width } = useWindowDimensions();

	const handleDragStart = (e) => e.preventDefault();

	const typeChange= (e) => {
		if(e.target.value === '1') {
			setState(data.residentialComplex);
			setSelectState(data.residentialComplex[0]);
		} else if(e.target.value === '2') {
			setState(data.residentialComplex.filter(i => i.type === 'Smart comfort'));
			setSelectState(data.residentialComplex.filter(i => i.type === 'Smart comfort')[0]);
		} else if(e.target.value === '3') {
			setState(data.residentialComplex.filter(i => i.type === 'Luxe'));
			setSelectState(data.residentialComplex.filter(i => i.type === 'Luxe')[0]);
		}
	}

	const resetChange =(e) => {
		for(let i of state) {
			if(e.target.value === i.name) {
				setSelectState(i)
			}
		}
	}
	
	const items = [];

	useEffect(() => {
		for(let i of selectResident.img) {
			items.push(<img width={width > 700 ? '800px' : '250px'} height={width > 700 ? '400px' : '300px'} src={i} onDragStart={handleDragStart} alt='' />);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectResident])

	return (
		<div className={s.wrapper}>
			<div className={s.left_side_bar}>
				<div className={s.title}>тип ремонта</div>
				<select name='type' className={s.select_menu} onChange={typeChange}>
					<option value="1">All</option>
					<option value="2">Smart Comfort</option>
					<option value="3">Luxe</option>
				</select>
				<div className={s.subtitle}>
					{`Найдено ${state.length} объектов:`}
				</div>
				{
					width > 700 
					?
					<div>
					{state.map(i => (
						<div key={i.id} className={s.item_wrapper} onClick={() => setSelectState(i)}>
							<p className={selectResident.id === i.id ? s.item_active : s.item}>{i.name}</p>
						</div>
					))}
				</div>
				:
				<select onChange={resetChange} name='type' className={s.select_menu}>
					{state.map(i => (
						<option key={i.id} value={i.name}>{i.name}</option>
					))}
				</select>
				}

			</div>
			<div className={s.content}>
				<div className={s.slider}>
					<AliceCarousel 
						activeIndex={0}
						disableSlideInfo={false}
						disableButtonsControls
						disableDotsControls
						mouseTracking
						items={items}
					/>
				</div>
				<div className={s.resident}>
					<span className={s.residentName}>
						{`${selectResident.name}`}</span> - <span className={s.residentAdress}>
						{`${selectResident.address}`}</span>
				</div>
				<div className={s.description}>
					{selectResident.description}
				</div>
			</div>
		</div>
	)
}

export default Main;