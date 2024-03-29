import React, { Component } from 'react';
import Modal from "../components/UI/Modal/Modal";

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqinterseptors = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })
            this.resinterseptors = axios.interceptors.response.use(res => res, error=> {
                this.setState({ error: error })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqinterseptors);
            axios.interceptors.request.eject(this.resinterseptors);
        }

        errorConfirmed = () => {
            this.setState({
                error: null
            })
        }

        render () {
            return (
                <>
                    <Modal
                        show={this.state.error}
                        modalClosed = {this.errorConfirmed}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
};

export default WithErrorHandler;