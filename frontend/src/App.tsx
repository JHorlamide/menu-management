import Sidebar from './components/Sidebar';
import TreeView from './components/MenuTree';

const App = () => {
  const menuData = [
    {
      id: '1',
      name: 'system management',
      children: [
        {
          id: '2',
          name: 'System Management',
          children: [
            {
              id: '3',
              name: 'Systems',
              children: [
                {
                  id: '4',
                  name: 'System Code',
                  children: [
                    { id: '5', name: 'Code Registration' },
                  ]
                },
                { id: '6', name: 'Code Registration - 2' },
                { id: '7', name: 'Properties' },
                {
                  id: '8',
                  name: 'Menus',
                  children: [
                    { id: '9', name: 'Menu Registration' }
                  ]
                },
                {
                  id: '10',
                  name: 'API List',
                  children: [
                    { id: '11', name: 'API Registration' },
                    { id: '12', name: 'API Edit' }
                  ]
                }
              ]
            },
            {
              id: '13',
              name: 'Users & Groups',
              children: [
                {
                  id: '14',
                  name: 'Users',
                  children: [
                    { id: '15', name: 'User Account Registration' }
                  ]
                },
                {
                  id: '16',
                  name: 'Groups',
                  children: [
                    { id: '17', name: 'User Group Registration' }
                  ]
                },
                {
                  id: '18',
                  name: '사용자 승인'
                }
              ]
            },
          ]
        }
      ]
    }
  ];

  return (
    <TreeView data={menuData} />
    // <div className="app">
    //   <Sidebar />
      
    // </div>
  );
};

export default App;
